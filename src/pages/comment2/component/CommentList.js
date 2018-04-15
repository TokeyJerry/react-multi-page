import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment.js';

/**
 * Created By Jianwen Tie
 * 
 * @CommentList:
 *   评论功能输出部分
 * 
 */ 
export default class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onDeleteComment: PropTypes.func
  }

	static defaultProps = {
    comments: []
  }

	constructor (props) {
		super(props);
	}

  handleDeleteComment (index) {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index)
    }
  }

  render() {
    return (
      <div>
      	{this.props.comments.map((comment, i) => 
          <Comment 
            comment={comment} 
            key={i}
            index={i}
            onDeleteComment={this.handleDeleteComment.bind(this)} />
        )}
			</div>
    )
  }
};