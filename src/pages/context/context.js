import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Index extends Component {

/**
 * getChildContext
 * 		getChildContext 这个方法就是设置 context 的过程，它返回的对象就是 context（也就是上图中处于中间的方块），所有的子组件都可以访问到这个对象。
 * childContextTypes
 * 		还有一个看起来很可怕的 childContextTypes，它的作用其实 propsType 验证组件 props 参数的作用类似。不过它是验证 getChildContext 返回的对象。为什么要验证 context，因为 context 是一个危险的特性，按照 React.js 团队的想法就是，把危险的事情搞复杂一些，提高使用门槛人们就不会去用了。如果你要给组件设置 context，那么 childContextTypes 是必写的。
 */

  static childContextTypes = {
    themeColor: PropTypes.string
  }

  constructor () {
    super()
    this.state = { themeColor: 'red' }
  }

  getChildContext () {
    return { themeColor: this.state.themeColor }
  }

  render () {
    return (
      <div>
        <Header />
        <Main />
      </div>
    )
  }
}

/**
 * 子组件 
 *   Header
 *   Main
 * 孙组件
 *   Title
 *   Content
 */
class Header extends Component {
  render () {
    return (
    <div>
      <h2>This is header</h2>
      <Title />
    </div>
    )
  }
}

class Main extends Component {
  render () {
    return (
    <div>
      <h2>This is main</h2>
      <Content />
    </div>
    )
  }
}

/**
 * 让 Title 组件可以利用最顶层父级的 context
 * 
 *   contextTypes
 *   子组件要获取 context 里面的内容的话，就必须写 contextTypes 来声明和验证你需要获取的状态的类型，它也是必写的，如果你不写就无法获取 context 里面的状态。
 */

class Title extends Component {
  static contextTypes = {
    themeColor: PropTypes.string
  }

  render () {
    return (
      <h1 style={{ color: this.context.themeColor }}>This is Header's child</h1>
    )
  }
}

class Content extends Component {
  render () {
    return (
    <div>
      <h2>This is Main's child</h2>
    </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  // document.getElementById('root')
  $('#root')
)
