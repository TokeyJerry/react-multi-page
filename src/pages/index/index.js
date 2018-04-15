import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import '../../commons/common.css';
import './index.css';

class Index extends Component {

	handleClick (event) {
		if (event.target.nodeName.toLowerCase() !== 'li') {
			return;
		}
		let locationName = event.target.getData('name') || '';
		
		location.href = locationName;
	}

	render () {
		return (
			<ul onClick={this.handleClick.bind(this)}>
		  	<li data-name="/lifecycle">lifecycle</li>
		  	<li data-name="/context">context</li>
		  	<li data-name="/status_promotion">status_promotion</li>
		  	<li data-name="/receive_props">receive_props</li>
		  	<li data-name="/comment">评论功能案例</li>
		  	<li data-name="/comment2">评论功能案例2</li>
		  	<li data-name="/comment3">评论功能案例 redux</li>
		  </ul>
		)
	}
}


ReactDOM.render(
	<div className={'warpper'}>
		<Index />
	</div>,
  document.getElementById('root')
)
