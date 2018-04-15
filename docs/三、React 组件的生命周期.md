
- docs 目录
    + [一、React 浅析](./一、React 浅析.md)
    + [二、DOM DIFF 算法](./二、DOM DIFF 算法.md)
    + 三、React 组件的生命周期
    + [四、React 组件间的数据传递](四、React 组件间的数据传递.md)
    + [五、虚拟 DOM 及内核 Virtual DOM and Internals ](五、虚拟 DOM 及内核 Virtual DOM and Internals.md)

## React 组件的生命周期

> 定义：React.js 将组件渲染，并且构造 DOM 元素然后塞入页面的过程称为组件的挂载。

### 一、常用的生命周期

- 概念
    + `componentWillMount`：组件挂载开始之前，也就是在组件调用 render 方法之前调用。
    + `componentDidMount`：组件挂载完成以后，也就是 DOM 元素已经插入页面后调用。
    + `componentWillUnmount`：组件对应的 DOM 元素从页面中删除之前调用。

- 用法：利用一个时钟的案例阐述
    
    一般来说，所有关于组件自身的状态的初始化工作都会放在 `constructor` 里面去做。

    ```js
    class Clock extends Component {
      constructor() {
        super();
        this.state = {
          date: new Date()
        }
      }

      render() {
        return (
          <div>
            {this.state.date.toLocaleTimeString()}
          </div>
        )
      }
    }
    ```

    **componentWillMount**
    一些组件启动的动作，包括像请求数据、一些定时器的启动等，就可以放在 `componentWillMount` 里面进行，例如 请求数据：

    ```js
    ···
      componentWillMount () {
        $ajax.get('/api/userInfo', (userData) => {
          this.setState({ userData })
        });
      }
    ···
    ```

    时钟案例中我们利用定时器：

    ```js
    class Clock extends Component {
      constructor() {
        super();
        this.state = {
          date: new Date()
        }
      }

      componentWillMount () {
        this.timer = setInterval(() => {
          this.setState({ date: new Date() });
        }, 1000);
      }

      render() {
        return (
          <div>
            {this.state.date.toLocaleTimeString()}
          </div>
        )
      }
    }
    ```

    我们在 `componentWillMount` 中用 `setInterval` 启动了一个定时器：每隔 1 秒通过调用 `setState` 方法更新 state.date，这样时钟就跑起来了。我们把它放到我们的主页面中，并加以渲染：

    ```js
    class Main extends Component {
      render () {
        return (
          <div>
            <Clock />
          </div>
        )
      }
    }

    ReactDOM.render(
      <Main />,
      document.getElementById('root')
    )
    ```

    **componentWillUnmount**
    我们给 `Main` 组件增加一个 显示、隐藏 的功能

    ```js
    class Main extends Component {
      constructor () {
        super();
        this.state = { isShowClock: true };
      }

      handleShowOrHide () {
        this.setState({
          isShowClock: !this.state.isShowClock
        })
      }

      render () {
        return (
          <div>
            {this.state.isShowClock ? <Clock /> : null }
            <button onClick={this.handleShowOrHide.bind(this)}>
              SHOW OR HIDE
            </button>
          </div>
        )
      }
    }

    ReactDOM.render(
      <Main />,
      document.getElementById('root')
    )
    ```

    以上我们实现了 显示、隐藏 时钟的功能，并且可以正常运行，但是打开控制台却发现点击按钮的时候在报错，报错信息大致为“`setState` 函数只能在挂载完毕或正在挂载的组件上运行”。

    原因：当时钟隐藏的时候，定时器并没有被清除，定时器仍在不停的尝试 `setState`，由于 `setState` 只能在“挂载完毕或正在挂载的组件上运行”，所以 React 开始不停的报错。

    此外，多次的隐藏和显示，`Clock` 组件会被重新构造和销毁，每次构造都会重新开启一个定时器。而每次销毁并没有清除定时器。而且因为 JavaScript 的闭包特性，这样会导致严重的内存泄漏。

    解决：`componentWillUnmount` 的作用就是在组件销毁的时候，做清场工作。

    ```js
    ...
      componentWillUnmount () {
        clearInterval(this.timer)
      }
    ...
    ```

    **componentDidMount**
    一般来说，有些组件的启动工作是依赖 DOM 的，例如动画的启动，而 componentWillMount 的时候组件还没挂载完成，所以没法进行这些启动工作，这时候就可以把这些操作放在 componentDidMount 当中。

### 二、多组件生命周期转换关系

> 一个组件就是一个状态机：对于特定的输入，它总会返回一致的输出。
> 
> React 生命周期是 React 组件运行的基础，React 组件提供了生命周期的钩子函数去响应组件不同时刻的状态，使得我们可以在组件生命周期的不同时间插入自己的功能。

从执行过程可以分为三类：**实例化**、**存在期**、**销毁&清理期**。

#### 1、实例化——装载过程（Mount），组件第一次在DOM树渲染的过程。

> 当我们的应用中的一个页面上定义了一个组件时，在定义虚拟节点时，我们不能立即依赖它在 DOM 中可用。相反，我们必须等到组件本身在浏览器中实际上是 `_mounted_` 。对于我们需要运行的功能，我们可以定义两个不同的 `_hooks_` （或函数）。在组件被装载在页面之前被调用的一个，在组件被装载之后被调用的一个。
> 
> 由于我们使用 React 定义了我们的 DOM 树中的节点的 `virtual representation` ，我们实际上并没有定义 DOM 节点。相反，我们正在建立一个内存视图，React为我们维护和管理。当我们谈论 `mounting` 时，我们谈论的是将虚拟组件转换为由 React 放置在 DOM 中的实际 DOM 元素的过程。

- 1）类调用：此过程仅在类创建时被一次，即无论创建多少个 ReactElement，此过程均只会执行一次。
    + `constructor`
- 2）实例化：此过程仅执行一次，执行完毕后，React 组件真正被渲染到 DOM 中期间执行生命周期函数如下
    + `getInitialState`
    + `getDefaultProps`
    + `componentWillMount`
    + `render`
    + `componentDidMount`

    **`constructor()`**：ES6 类的构造函数（为了初始化 `state` 或绑定 `this`）。
    **作用**：定义状态机变量，通过 `super(props)` 来绑定 `this`。

    **`getInitialState()`**：ES5 中初始化 `state`，React 在 ES6 的实现中去掉了 `getInitialState` 这个 `hook` 函数，规定 `state` 在 `constructor` 中实现。
    用于初始化每个实例的 `state`，此时可以访问 `this.state`。

    **`getDefaultProps()`**：ES5 中初始化 `props`。在 ES6 中使用 `defaultProps()` 方法。返回对象用于设置默认的 `props`，对于引用值，会在实例中共享。

    **`componentWillMount()`**：在组件被挂载前调用。只执行一次。我们一般在此修改组件的 `state`。

    **`render()`**：渲染组件，必须实现该方法。
    **触发条件**：（1）初始化加载页面（2）状态机改变setState ( 3 ) 接收到新的props（父组件更新）；
    **注意**：组件所必不可少的核心函数；不能在该函数中修改状态机state。

    **`componentDidMount()`**：在组件装载后调用。这时已经生成了真实的DOM节点。只执行一次。我们可以在此操作被渲染的 DOM 元素，同样可修改组件的 `state`。
    **作用**：渲染挂载组件；可以使用 `refs`（备注：React 支持一个特殊的属性，你可以将这个属性加在任何通过 `render()` 返回的组件中。这也就是说对 `render()` 返回的组件进行一个标记，可以方便的定位的这个组件实例。）

#### 2、存在期——更新过程（Update），当组件被重新渲染的过程。

> 有时我们会在更改实际呈现之前或之后更新我们组件的一些数据。 例如，假设当组件的属性更改时，我们要调用一个函数来设置渲染或调用一个函数集。`componentWillUpdate()`方法是一个合理的钩子来处理我们的组件进行更改（只要我们不调用 `this.setState()` 来处理它，因为它会导致无限循环）。

当组件的 `props` 或者 `state` 改变时就会触发组件的更新过程。期间执行生命周期函数如下：

- `this.state` 变更
    + `shouldComponentUpdate`
    + `componentWillUpdate`
    + `render`
    + `componentDidUpdate`
- `this.props` 变更
    + `componentWillReceiveProps`
    + `shouldComponentUpdate`
    + `componentWillUpdate`
    + `render`
    + `componentDidUpdate`

    **`componentWillReceiveProps()`**：组件接收到新的 `props` 时调用，并将其作为参数 `nextProps` 使用，此时可以更改组件 `state`。我们偶尔会有这种需求，子组件需要根据父组件的 `state` 改变，来修改自身的 `state`，所以子组件可以通过检测 `props` 的变化来修改 `state`，请看如下示例：

    ```js
    class Child extends React.Component {
      constructor (props) {
        super(props);
      }
      
      componentWillReceiveProps(nextProps) {
        // console.log(nextProps.name);
        // console.log(this.props.name);
        if (nextProps.name !== this.props.name) {
          // you can modified default state of this Child Components
          this.setState({
            
          });
        }
      }
      
      render () {
        return (<span>{this.props.name}</span>)
      }
    }

    class Content extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          text: "我是父组件的初始 state 值"
        };
      }

      handleClick () {
        this.setState({
          text: "我是父组件修改后的 state 值"
        });
      }

      render() {
        return (
          <div>
            <h1 onClick={this.handleClick.bind(this)}>Hello, world!</h1>
            <Child name={this.state.text}/>
          </div>
        );
      }
    }

    ReactDOM.render(
      <Content/>, 
      document.getElementById('root')
    );
    ```

    **shouldComponentUpdate()**：组件挂载后（即执行完 `render` ），接收到新的 `state` 或 `props` 时被调用，即每次执行 `setState` 都会执行该函数，来判断是否重新 `render` 组件；
    默认返回 `true`，`true` 表示继续执行 `render` 方法，`fasle` 表示放弃本次渲染；
    接收两个参数：第一个是新的 `props`，第二个是新的 `state`；
    我们在上例的子组件加上初始 `state`：

    ```js
    class Child extends React.Component {
      constructor (props) {
        super(props);
        this.state = {
          childText: 'init'
        }
      }
      
      componentWillReceiveProps(nextProps) {
        // console.log(nextProps.name);  // "我是父组件修改后的 state 值"
        // console.log(this.props.name);  // "我是父组件的初始 state 值"
        if (nextProps.name !== this.props.name) {
          // you can modified default state of this Child Components
          this.setState({
            childText: 'modified'
          });
        }
      }
      
      shouldComponentUpdate(nextProps, nextState) {
        // console.log(nextProps.name);  // "我是父组件修改后的 state 值"
        // console.log(nextState.childText);  // "modified"
        return true;
      }
      
      render () {
        return (<span>{this.props.name}</span>)
      }
    }

    class Content extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          text: "我是父组件的初始 state 值"
        };
      }

      handleClick () {
        this.setState({
          text: "我是父组件修改后的 state 值"
        });
      }

      render() {
        return (
          <div>
            <h1 onClick={this.handleClick.bind(this)}>Hello, world!</h1>
            <Child name={this.state.text}/>
          </div>
        );
      }
    }

    ReactDOM.render(
      <Content/>, 
      document.getElementById('root')
    );
    ```

    **componentWillUpdate()**：
    执行时间：在接收到新的 `props` 或者 `state`，重新渲染之前立刻调用，在初始化渲染的时候该方法不会被调用。
    作用：为即将发生的重新渲染做一些准备工作。
    注意：不能再该函数中通过 `this.setstate` 再次改变状态机，如果需要，则在 `componentWillReceiveProps` 函数中改变。

    **componentDidUpdate()**：
    执行时间：重新渲染后调用，在初始化渲染的时候该方法不会被调用。
    作用：使用该方法可以在组件更新之后操作DOM 元素。

#### 3、实例化——卸载过程（Unmount），组件重DOM树中删除的过程。

此过程在组件销毁前调用一次，期间执行生命周期函数如下：

- `componentWillUnmount`

    **`componentWillUnmount()`**
    **执行时间**：组件被卸载前调用，
    **作用**：在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 `componentDidMount` 中创建的 DOM 元素。

### 三、多组件使用周期注意事项

#### 1、父、子组件获取网络数据

当一个页面中存在父、子组件时，要注意 `componentWillMount` 和 `componentDidMount` 的使用，如果需要先加载父组件（获取网路数据），父组件传值给子组件，再加载子组件（获取网路数据），那么不能同时在父、子组件中使用 `componentDidMount` 获取网路数据，因为会先执行子组件的 `componentDidMount`，会由于未得到父组件的传值而报错。

- **解决方案：**
    + （1）父组件：`componentWillMount`，子组件：`componentDidMount`；
    + （2）父组件：`componentWillMount`，子组件：`componentWillMount`；

#### 2、redux 传参

当一个页面中如要实现左右联动效果，（比如：index 页面中包含 left（左）和 right（右）页面，单击 left 中的知识点，right 页面内容对应变化，left 向 right 通过 redux 传参，right 首次通过 `componentDidMount` 接收，后来通过 `componentWillReceiveProps` 接收）。

### 参考链接

- http://www.cnblogs.com/hhhyaaon/p/5807310.html
- https://doc.react-china.org/docs/state-and-lifecycle.html
- https://segmentfault.com/a/1190000006792687
- https://www.fullstackreact.com/30-days-of-react/day-7/
- http://react-china.org/t/react/1740
