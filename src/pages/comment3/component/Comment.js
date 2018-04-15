import React, { Component } from 'react'

/**
 * Created By Jianwen Tie
 * 
 * @Comment:  
 *   评论功能输出单个列表部分
 * 
 */ 
export default class Comment extends Component {
  render () {
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span>{this.props.comment.username} </span>：
        </div>
        <p>{this.props.comment.content}</p>
      </div>
    )
  }
}