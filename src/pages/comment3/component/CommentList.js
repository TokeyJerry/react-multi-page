import React, { Component } from 'react';

import Comment from './Comment.js';

/**
 * Created By Jianwen Tie
 * 
 * @CommentList:
 *   评论功能输出部分
 * 
 */ 
export default class CommentList extends Component {

	static defaultProps = {
    comments: []
  }

	constructor (props) {
		super(props);
	}

  render() {
    return (
      <div>
      	{this.props.comments.map((comment, i) => <Comment comment={comment} key={i}/>)}
			</div>
    )
  }
};