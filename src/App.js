import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CommentList from './components/CommentList';

function App() {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const comments = useSelector(state => state.comments);
  const dispatch = useDispatch();

  const addComment = () => {
    if (name.trim() === '' || text.trim() === '') return;
    const newComment = {
      id: Date.now(),
      name,
      text,
      date: new Date(),
      replies: [],
    };
    dispatch({ type: 'ADD_COMMENT', payload: newComment });
    setName('');
    setText('');
  };

  const sortedComments = comments.slice().sort((a, b) => {
    return sortOrder === 'asc'
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="app">
      <h2>Comment Section</h2>
      <div className="comment-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addComment}>Post</button>
      </div>

      <div className="sort-options">
        <label>Sort By:</label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="desc">Date and Time Descending</option>
          <option value="asc">Date and Time Ascending</option>
        </select>
      </div>

      <CommentList comments={sortedComments} />
    </div>
  );
}

export default App;
