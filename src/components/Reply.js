import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function Reply({ reply }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(reply.text);

  const dispatch = useDispatch();

  const saveEdit = () => {
    if (text.trim() === '') return;
    dispatch({
      type: 'UPDATE_COMMENT',
      payload: { ...reply, text },
    });
    setIsEditing(false);
  };

  return (
    <div className="reply">
      <div className="reply-header">
        <strong>{reply.name}</strong>
        <span>{new Date(reply.date).toLocaleString()}</span>
      </div>
      {isEditing ? (
        <div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={saveEdit}>Save</button>
        </div>
      ) : (
        <p>{reply.text}</p>
      )}
      <button onClick={() => setIsEditing(true)}>Edit</button>
    </div>
  );
}

export default Reply;
