import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ('./lifecycle.css');

class Img extends Component {

	componentWillUnmount() {
	  console.log('即将销毁');
	}

	render () {
		return (
			<img src={require('./images/index/c.jpg')} />
		)
	}
}

class Comp extends Component {

	constructor (...args) {
		super(...args);
		this.state = {
			alue: "",
			isShowHeader: true
		};
		this.handleClick = this.handleClick.bind(this);
	}

	fn (ev) {
		//ev 事件中转对象
		this.setState({
			value: ev.target.value
		})
	}

	handleClick (e) {
		location.href = '/login';
	}

	handleShowOrHide() {
	  this.setState({
	    isShowHeader: !this.state.isShowHeader
	  })
	}

	componentWillMount () {
		console.log('即将渲染');
	}

	componentDidMount () {
		console.log('渲染完毕');
	}

	componentWillUpdate () {
		console.log('即将更新');
	}

	componentDidUpdate () {
		console.log('刚刚更新完');
	}

	componentWillReceiveProps (nextProps) {
		console.log('组件参数更新' + nextProps);
	}
  
	render () {
		return <div>

			<div className='container'>
				<input type="text" onChange={this.fn.bind(this)} />
				<h1>你的名字是{this.state.value}</h1>
				{this.state.isShowHeader ? <Img /> : null}
				<button onClick={this.handleClick}>跳转</button>
				<button onClick={this.handleShowOrHide.bind(this)}>是否显示</button>
			</div>
		</div>;
	}
}

ReactDOM.render(
    <Comp name="test"/>,
    document.getElementById('app')
);
