
/**
 * action types 【初始化、新增、删除】
 * 
 */ 
const INIT_COMMENTS = 'INIT_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';
 
/**
 * reducer
 */ 
export default function (state, action) {
	if (!state) {
		state = {
			comments: []
		};
	}

	switch (action.type) {
		case INIT_COMMENTS:
      // 初始化评论
      return { comments: action.comments };
    case ADD_COMMENT:
      // 新增评论
      return {
        comments: [...state.comments, action.comment]
      };
    case DELETE_COMMENT:
      // 删除评论
      return {
        comments: [
          ...state.comments.slice(0, action.commentIndex),
          ...state.comments.slice(action.commentIndex + 1)
        ]
      };
		default:
			return state;
	}
};

/**
 * creators
 * action creators 其实就是返回 action 的函数，这样我们 dispatch 的时候只需要传入数据就可以了：
 *   dispatch(initComments(comments))
 */ 
export const initComments = (comments) => {
  return { type: INIT_COMMENTS, comments }
}

export const addComment = (comment) => {
  return { type: ADD_COMMENT, comment }
}

export const deleteComment = (commentIndex) => {
  return { type: DELETE_COMMENT, commentIndex }
}
