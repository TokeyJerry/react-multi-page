
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../../commons/common.css'
import './comment.css';

import CommentInput from './component/CommentInput.js';
import CommentList from './component/CommentList.js';

class Comment extends Component {

	constructor () {
    super();
    this.state = {
      comments: []
    };
  }

  // 数据回调函数
	handleSubmitComment (comment) {
		if (!comment) return;
    if (!comment.username) return alert('请输入用户名');
    if (!comment.content) return alert('请输入评论内容');

    this.state.comments.push(comment);
    this.setState({
      comments: this.state.comments
    });
  }

	render () {
		return (
			<div className='wrapper'>
				<CommentInput
					onSubmit={this.handleSubmitComment.bind(this)}/>
				<CommentList
					comments={this.state.comments}/>
			</div>
		)
	}
}

ReactDOM.render(
  <Comment/>,
  document.getElementById('root')
);
