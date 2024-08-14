import { createStore } from 'redux';

const initialState = {
  comments: JSON.parse(localStorage.getItem('comments')) || [],
};

function commentReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_COMMENT':
      return { ...state, comments: [...state.comments, action.payload] };
    case 'UPDATE_COMMENT':
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment.id === action.payload.id ? action.payload : comment
        ),
      };
    case 'DELETE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.payload.id),
      };
    default:
      return state;
  }
}

const store = createStore(commentReducer);

store.subscribe(() => {
  localStorage.setItem('comments', JSON.stringify(store.getState().comments));
});

export default store;
