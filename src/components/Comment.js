import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Reply from './Reply';

function Comment({ comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);
  const [replyText, setReplyText] = useState('');

  const dispatch = useDispatch();

  const saveEdit = () => {
    if (text.trim() === '') return;
    dispatch({ type: 'UPDATE_COMMENT', payload: { ...comment, text } });
    setIsEditing(false);
  };

  const addReply = () => {
    if (replyText.trim() === '') return;
    const newReply = {
      id: Date.now(),
      name: comment.name,
      text: replyText,
      date: new Date(),
    };
    dispatch({
      type: 'UPDATE_COMMENT',
      payload: {
        ...comment,
        replies: [...comment.replies, newReply],
      },
    });
    setReplyText('');
  };

  const deleteComment = () => {
    dispatch({ type: 'DELETE_COMMENT', payload: comment });
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <strong>{comment.name}</strong>
        <span>{new Date(comment.date).toLocaleString()}</span>
        <button className="delete-button" onClick={deleteComment}>Delete</button>
      </div>
      {isEditing ? (
        <div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={saveEdit}>Save</button>
        </div>
      ) : (
        <p>{comment.text}</p>
      )}
      <div className="comment-actions">
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={addReply}>Reply</button>
      </div>
      <div className="reply-section">
        <input
          type="text"
          placeholder="Reply"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button onClick={addReply}>Post</button>
        {comment.replies.map(reply => (
          <Reply key={reply.id} reply={reply} />
        ))}
      </div>
    </div>
  );
}

export default Comment;
