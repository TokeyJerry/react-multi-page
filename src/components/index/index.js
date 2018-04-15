
import React, {Component} from 'react';

import { GetData } from './getIndexData';

const getData = new GetData();


export class Comp extends GetData {

	constructor (...args) {
		super(...args);

		this.state = {
			value: "",
			data: {}
		};
	}

	fn (ev) {
		//ev 事件中转对象
		this.setState({
			value: ev.target.value
		})
	}
  
	render () {
		return <div>
			<input type="text" onChange={this.fn.bind(this)} />
			<h1>我的名字是{this.state.value}</h1>
			<div>{this.state.data.message}</div>
		</div>;
	}
}
