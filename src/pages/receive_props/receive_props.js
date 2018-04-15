
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Child extends Component {

	static defaultProps = {
		desc: '属性修改'
	}

	constructor(props) {
		super(props);

		this.state = {
			name: 'clild'
		};
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.desc === this.props.desc) {
			return false;
		}
		return false;
	}

	render () {
		console.log('我被渲染了');
		return (
			<div>
				<h2>name: {this.state.name}</h2>
				<p>desc: {this.props.desc}</p>
			</div>
		)
	}
}

class Main extends Component {
	constructor () {
		super();
		this.state = {
			actionName: '修改属性',
			desc: '状态修改'
		}
	}

	handleClick (e) {
		let $btn = e.target;
		if ($btn.getData('name')) {
			this.setState({
				desc: '状态修改了'
			});
		} else {
			this.setState({
				actionName: '属性修改了'
			});
		}
	}

	render () {
		return (
			<div>
				<h1>this.state.actionName</h1>
				<Child desc={this.state.desc}/>
				<button data-name='propsModify' onClick={this.handleClick.bind(this)}>点我修改子属性</button>
				<button onClick={this.handleClick.bind(this)}>点我修改父状态</button>
			</div>
		)
	}
}

ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);
