
## React 开发规范

### 一、组件的命名

- 1.组件的私有方法都用 `_` 开头
    
    ```js
    _loadUserName () {
      const userName = this.props.userName;
      if (userName) {
        // do something
      }
    }
    ```

- 2.所有事件监听的方法都用 `handle` 开头

    ```js
    <div
      onClick={this.handleClick.bind(this)} >
      click me
    </div>
    ```

- 3.把事件监听方法传给组件的时候，属性名用 `on` 开头

    ```js
    <CommentInput
      onSubmit={this.handleSubmitComment.bind(this)} />
    ```

### 二、组件的内容编写顺序

- 1.static 开头的静态类属性，如 `defaultProps`、`propTypes`。
- 2.构造函数，`constructor`。
- 3.`getter/setter`。
- 4.组件生命周期。
- 5.`_` 开头的私有方法。
- 6.事件监听方法，`handle*`。
- 7.`render*` 开头的方法，有时候 `render()` 方法里面的内容会分开到不同函数里面进行，这些函数都以 `render*` 开头。
- 8.`render()` 方法。

### 三、reducer 文件的定义顺序

- 1.定义 action types
- 2.编写 reducer 
- 3.编写与该 reducer 相关的 action creators
