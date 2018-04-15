import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Created By Jianwen Tie
 * 
 * @Comment:  
 *   评论功能输出单个列表部分
 * 
 */ 
export default class Comment extends Component {

  static propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number
  }

  constructor (props) {
    super(props)
    this.state = { timeString: '' }
  }

  componentWillMount () {
    this._updateTimeString()

    /**
     * 特别注意
     *    如果想在点击时候更新列表怎么操作
     */ 
    // 设置定时器，5 秒更新一次
    this._timer = setInterval(
      this._updateTimeString.bind(this),
      5000
    )
  }

  componentWillUpdate () {
    // this._updateTimeString.bind(this);
  }

  componentDidUpdate () {
    // console.log('updata')
    // this._updateTimeString.bind(this);
  }

  componentWillUnmount () {
    clearInterval(this._timer)
  }

  _updateTimeString () {
    const comment = this.props.comment;
    const duration = (+Date.now() - comment.createdTime) / 1000;
// console.log(duration)
    this.setState({
      timeString: duration > 60
        ? `${Math.round(duration / 60)} 分钟前`
        : `${Math.round(Math.max(duration, 1))} 秒前`
    })
  }

  handleDeleteComment () {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index)
    }
  }

  render () {

    return (
      <div className='comment'>
        <div className='comment-user'>
          <span>{this.props.comment.username} </span>：
        </div>
        <p>{this.props.comment.content}</p>
        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>
        <span 
          onClick={this.handleDeleteComment.bind(this)}
          className='comment-delete'>
          删除
        </span>
      </div>
    )
  }

}