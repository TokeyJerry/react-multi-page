
- docs 目录
    + 一、React 浅析
    + [二、DOM DIFF 算法](./二、DOM DIFF 算法.md)
    + [三、React 组件的生命周期](三、React 组件的生命周期.md)
    + [四、React 组件间的数据传递](四、React 组件间的数据传递.md)
    + [五、虚拟 DOM 及内核 Virtual DOM and Internals](五、虚拟 DOM 及内核 Virtual DOM and Internals.md)

## React 浅析

> 本文推荐 ES6 语法来编写 React，首先你需要 Babel 编译你的 ES6 代码，其次，你才可以使用比如 => （箭头函数），class（类），模板文字，let 和 const 语句等ES6语法。

### React 是什么？

> 用 JavaScript 频繁操作 DOM 的代价很高，就是这个原因让 React 的虚拟 DOM 就显得难能可贵了。React 厉害的地方并不是说它比 DOM 快（这句话本身是错的），而是说不管数据怎么变化，React 都可以以最小的代价来更新 DOM。方法就是在内存里面用新的数据刷新一个虚拟的 DOM 树，然后新旧 DOM 树进行比较，找出差异，再更新到真正的 DOM 树上。整个过程没有对 DOM 进行获取和操作，只有一个渲染的过程，所以 React 是一个 UI 框架。

#### 1、React JSX 语法

- HTML 语言直接写在 JavaScript 语言之中，不加任何引号，这就是 [JSX 的语法](https://reactjs.org/docs/introducing-jsx.html)，它允许 HTML 与 JavaScript 的混写。如下代码体现了 JSX 的基本语法规则：遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；遇到代码块（以 { 开头），就用 JavaScript 规则解析。

    ```js
    var names = ['Alice', 'Emily', 'Kate'];

    ReactDOM.render(
      <div>
      {
        names.map(function (name) {
          return <div>Hello, {name}!</div>
        })
      }
      </div>,
      document.getElementById('example')
    );
    ```

- JSX 允许直接在模板插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员。

    ```js
    var arr = [
      <h1>Hello world!</h1>,
      <h2>React is awesome</h2>,
    ];
    ReactDOM.render(
      <div>{arr}</div>,
      document.getElementById('example')
    );
    ```

注：更多关于 JSX 的语法请参考[英文文档](https://reactjs.org/docs/introducing-jsx.html)，[中文文档](https://doc.react-china.org/docs/introducing-jsx.html)。

#### 2、元素渲染 ReactDOM.render()

> 元素是构成 React 应用的最小单位。元素用来描述你在屏幕上看到的内容。
> 
> ReactDOM.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。如下代码将一个 h1 标题，插入 example 节点。

-  将元素渲染到 DOM 中

    ```js
    ReactDOM.render(
      <h1>Hello, world!</h1>,
      document.getElementById('example')
    );
    ```

- 更新元素渲染 & React 只会更新必要的部分

    当元素被创建之后，是无法改变其内容或属性的。一个元素就好像是动画里的一帧，它代表应用界面在某一时间点的样子。

    更新界面的唯一办法是创建一个新的元素，然后将它传入 ReactDOM.render() 方法，请参考[官方示例文档](https://doc.react-china.org/docs/rendering-elements.html)。

#### 3、组件 & Props

> React 允许将代码封装成组件（component），然后像插入普通 HTML 标签一样，在网页中插入这个组件。React.createClass 方法就用于生成一个组件类

- 函数定义/类定义组件

    ```js
    function Welcome(props) {
      return <h1>Hello, {props.name}</h1>;
    }

    ReactDOM.render(
      <Welcome name="John" />,
      document.getElementById('example')
    );
    ```

    ```js
    class Welcome extends React.Component {
      render() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    }

    ReactDOM.render(
      <Welcome name="John" />,
      document.getElementById('example')
    );
    ```
    
    变量 Welcome 就是一个组件类。模板插入 <Welcome /> 时，会自动生成 Welcome 的一个实例（"组件"都指组件类的实例）。所有组件类都必须有自己的 render 方法，用于输出组件。

    **另外注意两点：**
    1、组件类的第一个字母必须大写，否则会报错，比如 Welcome 不能写成 welcome，因为要和 DOM 标签避免开来。
    2、组件类只能包含一个顶层标签，否则也会报错。

- props

    React 还提到了一点，传递给组件的数据是"只读"的，要保证组件中的数据是"纯数据"，输入即输出。我们来看一个返回"纯数据"的函数：

    ```js
    function sum(a, b) {
      return a + b;
    }
    ```

    类似于上面的这种函数称为“纯函数”，它没有改变它自己的输入值，与之相对的是非纯函数，它会改变它自身的输入值：

    ```js
    function withdraw(account, amount) {
      account.total -= amount;
    }
    ```

    所有的 React 组件必须像"纯函数"那样使用它们的 props。那么，如果需要在组件中修改 props.data 该怎么做呢？比如下面的方式：

    ```js
    render() {
        const { data } = this.props;

        // 定义一个新的变量来保存修改后的值。
        let _data = data + 1;
    }
    ```

    组件的属性可以在组件类的 this.props 对象上获取，比如 name 属性就可以通过 this.props.name 读取。

    添加组件属性，有一个地方需要注意，就是 class 属性需要写成 className ，for 属性需要写成 htmlFor ，这是因为 class 和 for 是 JavaScript 的保留字。

#### 4、组件的状态（state） & [生命周期(请参考 React 组件的生命周期)](./三、React 组件的生命周期.md)

> 上述提到组件分为函数组件和类组件，函数组件是无状态，类组件有状态和生命周期。

- 什么是状态？
    
    通俗理解，就是组件不同时候的不同表现。比如，一个按钮组件，可能有激活状态，不可点击状态，显示状态，隐藏状态等，在 React 用 state 来保存这些状态。 而 state 本身不仅仅表示组件状态，还可以保存组件的数据。

    ```js
    class Button extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
            isShow: true,
            text: props.text,
            disabled: true,
            count: props.count
        };
      }

      render() {
          const { isShow, text, disabled} = this.state
          return <button disabled={disabled} style={{display: isShow ? "block" : "none"}}>{text}</button>
      }
    }
    ```

- 如何正确地使用状态？**setState() 函数的用法**

    **1）不要直接更新状态**

    ```js
    // 例如，此代码不会重新渲染组件：
    this.state.isShow = false;

    // 应当使用 setState():
    this.setState({
      isShow: false
    });
    ```

    **2）状态更新可能是异步的**

    React 可以将多个 setState() 调用合并成一个调用来提高性能，即 setState() 有批处理功能。

    因为 this.props 和 this.state 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。

    ```js
    // Wrong
    this.setState({
      count: this.state.count + this.props.increment,
    });

    // 如果你需要依赖上一次的状态和本次状态的计算，那么需要写成下面这种形式，该函数将接收先前的状态作为第一个参数，将此次更新被应用时的 props 做为第二个参数：
    this.setState((prevState, props) => ({
      count: prevState.count + props.increment
    }));
    ```

    还有一种情况，子组件不需要关注自身的状态，而是通过父组件的状态来改变，这时候的子组件可以写成函数形式，通过 props 传递父组件给的状态。

    **3）状态更新合并**

    当调用 setState() 修改组件状态时，只需要传入发生改变的 state，而不是组件完整的 state，因为组件 state 的更新是一个浅合并（Shallow Merge）的过程。例如，一个组件的状态为：

    ```js
    constructor(props) {
      super(props);
      this.state = {
        name: 'React',
        desc: 'React is an JavaScript library!'
      };
    }
    ```

    当只需要修改状态 name 时，只需要将修改后的 name 传给 setState：

    ```js
    this.setState({name: 'Reactjs'});
    ```

    React 会合并新的 name 值 到原来的组件状态中，同时保留原有的状态 desc，合并后的 state 为：

    ```js
    constructor(props) {
      super(props);
      this.state = {
        name: 'ReactJs',  /* 只是 name 值 改变了 */
        desc: 'React is an JavaScript library!'
      };
    }
    ```

#### 5、事件处理

- React 元素的事件处理和 DOM元素的很相似。但是仍然有语法上的不同。

    **1）React 事件绑定属性的命名采用驼峰式写法，而不是小写。**

    React 封装了不同类型的事件，请参考官网文档 [SyntheticEvent - React](https://reactjs.org/docs/events.html#supported-events)。

    **如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)。**

    ```js
    <button onClick={activateLasers}>
      Activate Lasers
    </button>
    ```

    **2）在 React 中不能使用返回 false 的方式阻止默认行为。必须明确的使用 preventDefault。**

    ```js
    class ActionLink extends React.Component {

      handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
      }

      render() {
        return (
          <a href="#" onClick={handleClick}>
            Click me
          </a>
        );
      }
    }
    ```

- React 事件中的 this。

    一般在某个类的实例方法里面的 this 指的是这个实例本身。 JSX 回调函数中的 this，则是 null 或者 undefined。

    这是因为 React 调用你所传给它的方法的时候，并不是通过对象方法的方式调用（this.handleClick），而是直接通过函数调用 （handleClick），所以事件监听函数内并不能通过 this 获取到实例。

    如果想在事件函数当中使用当前的实例，有以下三种方式可供参考：

    **1）通常情况下，如果你没有在方法后面添加 () ，例如 onClick={this.handleClick}，你应该为这个方法绑定 this。**

    ```js
    class ClickMe extends React.Component {
      
      constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
      }
      handleClick() {
        console.log('this is:', this);
      }

      render() {
        return (
          <button onClick={this.handleClick}>
            Click me
          </button>
        );
      }
    }
    ```

    **2）如果你对 bind 很困惑，并且正在使用实验性的[属性初始化器语法](https://babeljs.io/docs/plugins/transform-class-properties/)，你可以使用属性初始化器来正确的绑定回调函数：**

    ```js
    class ClickMe extends React.Component {
      // This syntax ensures `this` is bound within handleClick.
      // Warning: this is *experimental* syntax.
      handleClick = () => {
        console.log('this is:', this);
      }

      render() {
        return (
          <button onClick={this.handleClick}>
            Click me
          </button>
        );
      }
    }
    ```

    **3）还可以在回调函数中使用箭头函数：**

    ```js
    class ClickMe extends React.Component {

      handleClick() {
        console.log('this is:', this);
      }

      render() {
        return (
          <button onClick={(e) => this.handleClick(e)}>
            Click me
          </button>
        );
      }
    }
    ```

    使用这个语法有个问题就是每次 ClickMe 渲染的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题。

- 向事件处理程序传递参数

    通常我们会为事件处理程序传递额外的参数。下面两种方式都可行，分别通过 arrow functions 和 Function.prototype.bind 来为特定事件类型添加事件处理程序。

    ```js
    <button onClick={(e) => this.handleClick(id, e)}>Delete Row</button>
    <button onClick={this.handleClick.bind(this, id)}>Delete Row</button>
    ```
    
    值得注意的是，通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面。

#### 6、条件渲染

> React 中的条件渲染和 JavaScript 中的一致，可以通过操作符 `if` 或条件运算符来渲染元素。

- `if` 条件判断

    我们常遇到判断登陆状态与否来展示不同的信息，如下示例是根据 `isLoggedIn` 的值来展示不同的信息：

    ```js
    class IsLoggedIn extends React.Component {
      constructor(props) {
        super(props);
        this.isLoggedIn = props.isLoggedIn;
      }

      render() {
        if (this.isLoggedIn) {
          return <h1>Welcome ReactJs!</h1>;
        }
        return <h1>Please sign up.</h1>;
      }

    }

    ReactDOM.render(
      // Try changing to isLoggedIn={true}:
      <IsLoggedIn isLoggedIn={false} />,
      document.getElementById('root')
    );
    ```

- 与运算符 &&
  
    JSX 允许你通过花括号包裹 JavaScript 代码，可以方便的通过 JavaScript 表达式渲染页面。

    ```js
    class IsLoggedIn extends React.Component {
      constructor(props) {
        super(props);
        this.isLoggedIn = props.isLoggedIn;
      }

      render() {
        return (
          <div>
            { this.isLoggedIn && <h1>Welcome ReactJs!</h1>}
            { !this.isLoggedIn && <h1>Please sign up.</h1>}
          </div>
        )
      }

    }

    ReactDOM.render(
      // Try changing to isLoggedIn={true}:
      <IsLoggedIn isLoggedIn={false} />,
      document.getElementById('root')
    );
    ```

    我们知道，在 JavaScript 中，`true && expression` 总是返回 `expression`，而 `false && expression` 总是返回 `false`。因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。

- 三元表达式（三目运算符）

    条件渲染的另一种方法是使用 JavaScript 的条件运算符 condition ? true : false。我们把上面的例子修改下：

    ```js
    ···
      render() {
        return (
          <div>
            { this.isLoggedIn ? <h1>Welcome ReactJs!</h1> : <h1>Please sign up.</h1>}
          </div>
        )
      }
    ···
    ``` 

- 阻止组件渲染

    在极少数情况下，你可能希望隐藏组件，即使它被其他组件渲染。让 render 方法返回 null 而不是它的渲染结果即可实现。

    如下例，我们需要某个按钮来控制另外的模块显示、隐藏：

    ```js
    class Info extends React.Component {
      constructor(props) {
        super(props);
      }

      render() {
        if (!this.props.show) {
          return null;
        }

        return(
          <div>
            Show Info!
          </div>
        )
      }
    }

    class Main extends React.Component {
      constructor(props) {
        super(props);
        this.state = {show: true}
        this.handleToggleClick = this.handleToggleClick.bind(this);
      }

      handleToggleClick() {
        this.setState(prevState => ({
          show: !prevState.show
        }));
      }

      render() {
        return (
          <div>
            <Info show={this.state.show} />
            <button onClick={this.handleToggleClick}>
              {!this.state.show ? 'Hide' : 'Show'}
            </button>
          </div>
        );
      }
    }

    ReactDOM.render(
      <Main/>,
      document.getElementById('root')
    );
    ```

    组件的 `render` 方法返回 `null` 并不会影响该组件生命周期方法的回调。例如，`componentWillUpdate` 和 `componentDidUpdate` 依然可以被调用。

#### 7、列表 & Keys

> 渲染列表需要注意：1、判断数组是否为空；2、需要为每一条数据加一个 key 值。

- 渲染多个组件

    JSX 允许我们使用 {} 构建元素集合

    ```js
    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
      <li>{number}</li>
    );

    // 把新数组插入到 ul 元素中，渲染 DOM
    ReactDOM.render(
      <ul>{listItems}</ul>,
      document.getElementById('root')
    );
    ```

- Keys

    Keys 可以在 DOM 中的某些元素被增加或删除的时候帮助 React 识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据的 id 作为元素的 key，当元素没有确定的 id 时，你可以使用他的序列号索引 index 作为 key

    ```js
    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number, index) =>
      <li key={index}>{number}</li>
    );

    // 把新数组插入到 ul 元素中，渲染 DOM
    ReactDOM.render(
      <ul>{listItems}</ul>,
      document.getElementById('root')
    );
    ```

- 用 keys 提取组件

    元素的 key 只有在它和它的兄弟节点对比时才有意义。换句话说，我们应该把 key 值保存在被循环的列表元素上。示例如下：

    ```js
    const numbers = [1, 2, 3, 4, 5];

    class ListItem extends React.Component {
      constructor (props) {
        super(props);
      }
      
      render () {
        return (
          // key 值不应该在 li 上保存
          <li>{this.props.value}</li>
        )
      }
    }

    class NumberList extends React.Component {
      constructor (props) {
        super(props);
      }
      
      render () {
        const listItems = this.props.numbers.map(number =>
          // key 值应该保存在最外层循环的元素上
          <ListItem key={number.toString()} value={number} />
        );
        return (
          <ul>
            {listItems}
          </ul>
        );
      }
    }

    ReactDOM.render(
      <NumberList numbers={numbers} />,
      document.getElementById('root')
    );
    ```

#### 8、表单

> HTML表单元素与 React 中的其他 DOM 元素有所不同,因为表单元素生来就保留一些内部状态。

- 受控组件：由 React 控制输入的表单组件。

    所谓受控组件，就是 input 的 value 值由 state 来决定，用户出发 `onChange` 事件更新 state，从而达到修改 value 的值。

    ```js
    class NameForm extends React.Component {
      constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
    }
    ```

    在此应该提及注意的是：传统的 input 表单，value 值是不需要我们我们维护的（value 由 inupt 自身维护，只需要获取即可）。textarea 和 input 的用法是一样的，有区别的是 select 控件：

    ```js
    class FlavorForm extends React.Component {
      constructor(props) {
        super(props);
        this.state = {value: 'coconut'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Pick your favorite La Croix flavor:
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option value="coconut">Coconut</option>
                <option value="mango">Mango</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
    }
    ```

    看上面的官方示例可以明白：在 React 中，并不使用 DOM 元素的 `selected` 属性，而在根 select 标签上用 value 属性来表示选中项。这在受控组件中更为方便，因为我们只需要在一个地方来更新组件。

- 多个输入的解决方法

    当有处理多个受控的表单元素时，是否要写多个处理函数呢？我们可以通过给每个元素添加一个 name 属性，来让同一个处理函数根据 event.target.name 的值来选择做什么。

    ```js
    class Reservation extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          isGoing: true,
          numberOfGuests: 2
        };

        this.handleInputChange = this.handleInputChange.bind(this);
      }

      handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
      }

      render() {
        return (
          <form>
            <label>
              Is going:
              <input
                name="isGoing"
                type="checkbox"
                checked={this.state.isGoing}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Number of guests:
              <input
                name="numberOfGuests"
                type="number"
                value={this.state.numberOfGuests}
                onChange={this.handleInputChange} />
            </label>
          </form>
        );
      }
    }
    ```

- 非受控组件

    有时使用受控组件可能很繁琐，因为很有可能要为数据可能发生变化的每一种方式都编写一个事件处理程序，并通过一个组件来管理全部的状态。当我们将预先存在的代码库转换为 React 或将 React 应用程序与非 React 库集成时，这可能变得特别繁琐。在以上情况下，非受控组件就成了弥补以上不足的一种替代技术。

    **什么是不受控组件**：就是 DOM 自己维护状态的组件，不受 React 控制。我们可以给它**设置 `defaultValue`，但是不能去 `setState`**。

    ```js
    class NameForm extends React.Component {
      constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleSubmit(event) {
        alert('A name was submitted: ' + this.input.value);
        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" ref={(input) => this.input = input} defaultValue="默认值" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
    }
    ```

    如果想更深入的明白如何使用受控组件与非受控组件，请移步 [Controlled and uncontrolled form inputs in React don't have to be complicated](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)

#### 9、状态提升

> 提及状态提升，首先得了解数据的 **双向绑定** 和 **单向数据流**。
> 双向绑定使得数据可以轻松的在不同的组件之间实现共享，但在 React 中不推荐使用双向绑定，而是使用状态提升的方式。

- 单向数据流

    数据从父组件通过 props 流向子组件，如果在子组件中，需要修改 state 来和其他子组件共享数据更新，就需要使用回调函数给使数据更新给父组件，然后从父组件流向其他的子组件，这样做是保证数据有单一的来源。

    如果子组件和子组件之间任意共享数据，那么当组件庞大的时候会很痛苦，那么状态提升就解决了很大一部分问题

- 状态提升

    现在我们想实现一个功能：两个输入框中的其中一个修改 value 值，另一个随之改变，

    ```js
    class Input extends React.Component {
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
      }

      handleChange(e) {
        this.props.upDateValue(e.target.value);
      }

      render() {
        const {name, value} = this.props;
        return (
          <div>
            <p>{name}：</p>
            <input value={value}
                   onChange={this.handleChange} 
              />
          </div>
        );
      }
    }

    class Container extends React.Component {
      constructor(props) {
        super(props);
        this.state = {value: '', name: ''};
        
        this.upDateValue = this.upDateValue.bind(this);
      }

      upDateValue(value) {
        this.setState({value: value});
      }
      
      render() {
        const {value} = this.state;

        return (
          <div>
            <Child name="组件1" value={value} upDateValue={this.upDateValue} />
            <Child name="组件2" value={value} upDateValue={this.upDateValue} />
          </div>
        );
      }
    }

    ReactDOM.render(
      <Demo />,
      document.getElementById('root')
    );
    ```

    [官网 demo 详细解释](https://doc.react-china.org/docs/lifting-state-up.html)

    在 React 应用中，对应任何可变数据理应只有一个单一“数据源”。通常，状态都是首先添加在需要渲染数据的组件中。此时，如果另一个组件也需要这些数据，你可以将数据提升至离它们最近的父组件中。你应该在应用中保持自上而下的数据流，而不是尝试在不同组件中同步状态。

    状态提升比双向绑定方式要写更多的“模版代码”，但带来的好处是，你也可以更快地寻找和定位 bug 的工作。因为哪个组件保有状态数据，也只有它自己能够操作这些数据，发生 bug 的范围就被大大地减小了。此外，你也可以使用自定义逻辑来拒绝或者更改用户的输入。

    如果某些数据可以由 props 或者 state 提供，那么它很有可能不应该在 state 中出现。另一个输入框中的值总是可以在 render() 函数中由这些保存的数据计算出来。这样我们可以根据同一个用户输入精准计算出两个需要使用的数据。

### 参考链接

- https://reactjs.org
- https://doc.react-china.org/docs/try-react.html 
- http://www.ruanyifeng.com/blog/2015/03/react.html 
- https://github.com/hyy1115/react-latest-framework/blob/master/doc/react教程深入分析.md 
- https://github.com/hyy1115/react-latest-framework/blob/master/doc/react官网教程基础解析.md
- https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/
