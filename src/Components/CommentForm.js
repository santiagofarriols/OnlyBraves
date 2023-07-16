import React, { useState } from 'react';
import '../Styles/CommentForm.css';

const CommentForm = () => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el comentario
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <div >
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Deja un comentario"
          className="flex-1 mr-2 rounded-input"
        />
        <button
          className="button"
          type="submit"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default CommentForm;