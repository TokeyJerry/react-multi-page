import React, { Component } from 'react';

/**
 * Created By Jianwen Tie
 * 
 * @CommentInput:  
 *   评论功能输入部分
 * 
 */ 
 

export default class CommentInput extends Component {

	constructor (props) {
		super(props);
		this.state = {
			username: '',
			content: '',
      createdTime: ''
		}
	}

	handleUsernameChange (event) {
    this.setState({
      username: event.target.value
    })
  }

	handleContentChange (event) {
    this.setState({
      content: event.target.value
    })
  }

  handleSubmit () {
    if (this.props.onSubmit) {
      const { username, content } = this.state;
      const createdTime = +new Date();
      this.props.onSubmit({username, content, createdTime})
    }
    this.setState({ content: '' })
  }

  // 页面加载时候取用户名
  _loadUsername () {
    const username = localStorage.getItem('username');
    if (username) {
      this.setState({ username })
    }
  }

  componentWillMount () {
    this._loadUsername()
  }

  // 打开页面自动聚焦到 content
  componentDidMount () {
    this.textarea.focus()
  }

  // 失去焦点保存用户名
  handleUsernameBlur (event) {
    let username = event.target.value || '';
    localStorage.setItem('username', username);
  }

  render() {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input 
              value={this.state.username}
              onBlur={this.handleUsernameBlur.bind(this)}
              onChange={this.handleUsernameChange.bind(this)} />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea 
              ref={(textarea) => this.textarea = textarea}
              value={this.state.content}
              onChange={this.handleContentChange.bind(this)} />
          </div>
        </div>
        <div className='comment-field-button'>
          <button
            onClick={this.handleSubmit.bind(this)}>
            发布
          </button>
        </div>
      </div>
    )
  }
};
