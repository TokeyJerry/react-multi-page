
# JSX 实现原理浅析

> 本文旨在解析 JSX 语法写法的来由，如何一步步的从 DOM 字符窜拼接、事件绑定、方法实现，到我们的 JSX 封装。

> 本文以点赞、取消的功能来阐述（文中代码以 ES6 写法阐述），该例基本包括了【状态改变】、【事件绑定】、【方法封装】等基本要求。

### 一、传统方法实现

HTML 结构：

```html
  <body>
    <div class='wrapper'>
      <button class='like-btn'>
        <span class='like-text'>点赞</span>
        <span>👍</span>
      </button>
    </div>
  </body>
```

JavaScript 功能：

```js
  const $button = document.querySelector('.like-btn');
  const $buttonText = $button.querySelector('.like-text');

  let isLiked = false;

  $button.addEventListener('click', () => {
    isLiked = !isLiked;
    if (isLiked) {
      $buttonText.innerHTML = '取消';
    } else {
      $buttonText.innerHTML = '点赞';
    }
  }, false);
```

以上简单的代码我们实现了点赞、取消的功能。如果发现一个大的项目里有好多个这样的功能，此时代码的复用拷贝结构及整段 JavaScript 代码。因此，我们对组件化写法的需求必不可少，我们按照如下思路开始封装该功能：

- [结构复用](#1)
- [实现简单的组件化](#2)
- [状态改变 -> 构建新的 DOM 元素更新页面](#3-dom)
- [重新插入新的 DOM 元素](#4-dom)
- [抽象出公共组件类](#5)

### 二、实现 JSX 语法

#### 1、结构复用

- 实现 HTML 的封装
    
    首先我们将功能元素从容器中剥离出来，使其结构与容器脱离：

    ```js
    class LikeButton {
      render () {
        return `
          <button id='like-btn'>
            <span class='like-text'>赞</span>
            <span>👍</span>
          </button>
        `
      }
    }
    ```

- HTML 的利用

    通过上述类，我们暴露一个 render 方法，返回 DOM 字符串，然后利用这个类构建不同地方的点赞功能：

    ```js
    const $wrapper = document.querySelector('.wrapper');

    const likeButton = new LikeButton();
    $wrapper.innerHTML = likeButton.render();

    // 可以创建多个实例构建点赞功能
    const $wrapper1 = document.querySelector('.wrapper1');

    const likeButton1 = new LikeButton();
    $wrapper1.innerHTML = likeButton1.render();
    ```

#### 2、实现简单的组件化

- 添加事件

    此处的问题是：`LikeButton` 类里面是虽然说有一个 `button`，但是还没有插入到 DOM 里，字符串并不能添加事件（DOM 事件的 API 只有 DOM 结构才能用），而我们每次在插入 DOM 之后才能进行事件绑定，这又回归到了原始的 DOM 操作，并不是我们需要的组件化。

    我们想要的是：在我们想要绑定事件之前，**`LikeButton` 这个类除了能接收我们的字符串，同时能给我们一个成型的 DOM 结构**，现在我们定义一个函数 `createDOMFromString` 来填补这个需求：

    ```js
    // String to Document HTMLElement
    const createDOMFromString = (domString) => {
      const div = document.createElement('div');
      div.innerHTML = domString;
      return div;
    }
    ```

    此时，我们修正 `LikeButton` 类：

    ```js
    class LikeButton {
      render () {
        this.el = createDOMFromString(`
          <button class='like-button'>
            <span class='like-text'>点赞</span>
            <span>👍</span>
          </button>
        `);
        this.el.addEventListener('click', () => console.log('click'), false);
        return this.el;
      }
    }
    ```

    现在 `render` 方法返回的不是 html 字符串了，而是一个 DOM 元素，那我们插入容器的方式也需要重新修改下：

    ```js
    const $wrapper = document.querySelector('.wrapper');

    const likeButton = new LikeButton();
    $wrapper.wrapper.appendChild(likeButton.render());
    ```

- 完善事件功能

    上述的代码已经可以在内部添加事件了，我们需要进一步实现点赞功能：

    ```js
    class LikeButton {
      constructor () {
        this.state = { isLiked: false }
      }

      changeLikeText () {
        const $likeText = this.el.querySelector('.like-text');
        this.state.isLiked = !this.state.isLiked;
        $likeText.innerHTML = this.state.isLiked ? '取消' : '点赞';
      }

      render () {
        this.el = createDOMFromString(`
          <button class='like-button'>
            <span class='like-text'>点赞</span>
            <span>👍</span>
          </button>
        `);
        this.el.addEventListener('click', this.changeLikeText.bind(this), false);
        return this.el;
      }
    }
    ```
    
    此处我们有俩个关键点：
    1、我们在 `constructor` 里添加一个状态对象 `state` ，并且在 `state` 对象下写入了默认状态；
    2、创建 `changeLikeText` 方法，完成事件所需的功能。

    然而，我们自定义的事件方法 `changeLikeText` 还存在问题：**DOM 操作**。如果我们每一次或者有大量的状态改变都频繁的操作 DOM，还是个比较繁琐的事情。

    一个组件的显示形态由多个状态决定的情况非常常见。代码中混杂着对 DOM 的操作其实是一种不好的实践，手动管理数据和 DOM 之间的关系会导致代码可维护性变差、容易出错。所以这里仍需优化：如何尽量减少这种手动 DOM 操作？

#### 3、状态改变 -> 构建新的 DOM 元素更新页面

- 统一 DOM 操作

    为了解决上述 DOM 操作问题，我们在状态改变的时候统一操作 DOM：**监听状态改变，重新调用 `render` 方法，构建新 DOM 元素** 。
    如此优点如下：
    1、我们自定义事件方法里只管理数据状态；
    2、我们在构造函数中埋个钩子 `setState` 方法来监听数据改变，重新调用 `render` 方法。

    ```js
    class LikeButton {
      constructor () {
        this.state = { isLiked: false };
      }

      setState (state) {
        this.state = state;
        this.el = this.render();
      }

      changeLikeText () {
        this.setState({
          isLiked: !this.state.isLiked
        });
      }

      render () {
        this.el = createDOMFromString(`
          <button class='like-btn'>
            <span class='like-text'>${this.state.isLiked ? '取消' : '点赞'}</span>
            <span>👍</span>
          </button>
        `);
        this.el.addEventListener('click', this.changeLikeText.bind(this), false);
        return this.el;
      }
    }
    ```

#### 4、重新插入新的 DOM 元素

- 完善更新 DOM

    上面的代码逻辑已经很清晰了，但是我们修改完状态并创建了新的 DOM 元素，但是在组件外面并没有重新插入新创建的元素，也没有删除旧的元素。此时我们需要修改一下 `setState` 方法：

    ```js
    ...
      setState (state) {
        const $oldEl = this.el;
        this.state = state;
        this.el = this.render();
        if (this.onStateChange) this.onStateChange($oldEl, this.el);
      }
    ...
    ```

    组件调用如下：

    ```js
    const likeButton = new LikeButton();
    $wrapper.appendChild(likeButton.render()) // 第一次插入 DOM 元素
    likeButton.onStateChange = ($oldEl, $newEl) => {
      $wrapper.insertBefore($newEl, $oldEl) // 插入新的元素
      $wrapper.removeChild($oldEl) // 删除旧的元素
    }
    ```

- 问题剖析

    我们通过实例化之后自定义的 `onStateChange` 方法完成了页面的更新，但是每次 `setState` 所引发的问题就是：重新创建元素、新增、删除 DOM 元素，会导致浏览器进行大量的重排，这又引出了 React 一项新的技术，Virtual-DOM。请参考[虚拟 DOM 及内核 Virtual DOM and Internals](五、虚拟 DOM 及内核 Virtual DOM and Internals.md)

#### 5、抽象出公共组件类

- 抽离公共组件

    以上功能虽然已经比较完善了，但是对于 `setState` 方法里面的内容扩展性不是很好，因为我们换个其他的功能组件，这里就不太合适了。

    为了让代码更灵活，可以写更多的组件，我们把这种模式抽象出来，放到一个 `Component` 类当中：

    ```js
    class Component {
      setState (state) {
        const $oldEl = this.el;
        this.state = state;
        this._renderDOM();
        if (this.onStateChange) this.onStateChange($oldEl, this.el);
      }

      _renderDOM () {
        this.el = createDOMFromString(this.render());
        if (this.onClick) {
          this.el.addEventListener('click', this.onClick.bind(this), false);
        }
        return this.el;
      }
    }
    ```

    这个是一个组件父类 `Component`，所有的组件都可以继承这个父类来构建。它定义的两个方法，一个是我们已经很熟悉的 `setState`；一个是私有方法 `_renderDOM`。`_renderDOM` 方法会调用 `this.render` 来构建 DOM 元素并且监听 `onClick` 事件。所以，组件子类继承的时候只需要实现一个返回 HTML 字符串的 `render` 方法就可以了。

    我们还需要一个额外的 `mount` 的方法，其实就是把组件的 DOM 元素插入页面，并且在 `setState` 的时候更新页面：

    ```js
    const mount = (component, $wrapper) => {
      $wrapper.appendChild(component._renderDOM());
      component.onStateChange = ($oldEl, $newEl) => {
        $wrapper.insertBefore($newEl, $oldEl);
        $wrapper.removeChild($oldEl);
      };
    };
    ```

    综上，我们可以重新定义我们的组件：

    ```js
    class LikeButton extends Component {
      constructor () {
        super();
        this.state = { isLiked: false };
      }

      onClick () {
        this.setState({
          isLiked: !this.state.isLiked
        });
      }

      render () {
        return `
          <button class='like-btn'>
            <span class='like-text'>${this.state.isLiked ? '取消' : '点赞'}</span>
            <span>👍</span>
          </button>
        `;
      }
    }

    mount(new LikeButton(), $wrapper);
    ```

- props 参数

    React 还有一个重要的参数 `props`，因为在实际开发当中，我们可能需要给组件传入一些自定义的配置数据。我们仅仅需要修改父类 `Component` 的构造函数即可：

    ```js
    ...
      constructor (props = {}) {
        this.props = props;
      }
    ...
    ```

    继承的时候通过 `super(props)` 把 `props` 传给父类，这样就可以通过 `this.props` 获取到配置参数：

    ```js
    class LikeButton extends Component {
      constructor (props) {
        super(props);
        this.state = { isLiked: false };
      }

      onClick () {
        this.setState({
          isLiked: !this.state.isLiked
        });
      }

      render () {
        return `
          <button class='like-btn' style="background-color: ${this.props.bgColor}">
            <span class='like-text'>
              ${this.state.isLiked ? '取消' : '点赞'}
            </span>
            <span>👍</span>
          </button>
        `;
      }
    }

    mount(new LikeButton({ bgColor: 'red' }), $wrapper);
    ```

    现在我们简单的实现了 React 的 JSX 语法，以上可以简单的理解 JSX 语法的由来。如果想深入学习，请参考更多以下文档。

### 参考链接

- [React.js 小书](http://huziketang.mangojuice.top/books/react/)
- https://github.com/facebook/react
