import React, { useState, useEffect, useRef } from "react";
import db, { storage, auth, firebase } from '../firebase_setup/firebase';
import "../Styles/HomePage1.css";
import sig from "../Multimedia/Sig.png";
import previous from "../Multimedia/antes.png";
import like from "../Multimedia/like.png";
import comments1 from "../Multimedia/comments.png"
import "../Styles/FranklinAve.ttf";
import '../Styles/DareVideo1.css';
import '../Styles/CommentForm.css';
import send from '../Multimedia/SEND.png';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const DareVideo1 = () => {
  const { currentUser } = useContext(AuthContext);
  const [currentReto, setCurrentReto] = useState(0);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [completedDares, setCompletedDares] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");  
  const videoRef = useRef();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (currentUser) {
      firebase.auth().currentUser.getIdTokenResult()
        .then((idTokenResult) => {
          // Confirmar si el usuario es un administrador.
          if (!!idTokenResult.claims.admin) {
            setIsAdmin(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentUser]);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    const unsubscribe = db.collection('completedDares').onSnapshot((snapshot) => {
      const completedDaresData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCompletedDares(completedDaresData);
      setCurrentReto(0); 
    });
  
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    if (completedDares[currentReto]) {
      setVideoUrl(completedDares[currentReto].videoUrl);
    }
  }, [completedDares, currentReto]);

  useEffect(() => {
    const videoId = completedDares[currentReto]?.id;

    if (videoId) {
      const unsubscribe = db.collection('comments')
        .where('videoId', '==', videoId)
        .orderBy('timestamp', 'desc')  
        .onSnapshot((snapshot) => {
          const newComments = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setComments(newComments);
        });

      return () => unsubscribe();
    }
  }, [completedDares, currentReto]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handlePreviousReto = () => {
    if (currentReto > 0) {
      setCurrentReto(currentReto - 1);
    }
  };

  const handleNextReto = () => {
    if (currentReto < completedDares.length - 1) {
      setCurrentReto(currentReto + 1);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const userId = auth.currentUser.uid;
    const videoId = completedDares[currentReto].id;

    const commentData = {
      userId,
      videoId,
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
      await db.collection('comments').add(commentData);
      setComments([...comments, commentData]); 
      setComment("");
    } catch (error) {
      console.error("Error subiendo el comentario: ", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const commentRef = db.collection('comments').doc(commentId);
  
    // Eliminar el comentario
    await commentRef.delete();
  
    // Actualizar la lista de comentarios en el estado
    const newComments = comments.filter((comment) => comment.id !== commentId);
    setComments(newComments);
  };  

  const handleDeleteVideo = async () => {
    const videoId = completedDares[currentReto].id;
    
    // Empezar una nueva transacción batch
    const batch = db.batch();
  
    // Borrar todos los comentarios asociados con el video
    const commentsSnapshot = await db.collection('comments').where('videoId', '==', videoId).get();
    commentsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
  
    // Ejecutar la transacción batch
    await batch.commit();

    const videoRef = db.collection('completedDares').doc(videoId);

    // Eliminar el video
    await videoRef.delete();
    
    // Actualizar la lista de videos
    const newCompletedDares = completedDares.filter((dare) => dare.id !== videoId);
    setCompletedDares(newCompletedDares);

  };
  

  return (
    <div className="container3">
      <div className="title-container">
        <h1 className="title">
          <span className="titleRetoRed">Reto: </span>
          <span className="titleReto">{completedDares[currentReto]?.title}</span>
        </h1>
        <h2 className="price">
         {completedDares[currentReto]?.price} €
        </h2>
        
      </div>
      {isAdmin && (
          <button onClick={handleDeleteVideo}>Eliminar video</button>
        )}
      <div className="frame">
        <div className="columna columna1">
          <img src={previous}
            alt="Button"
            onClick={handlePreviousReto} className="arrow arrow-left" style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }} />
          <img
            src={sig}
            alt="Button"
            onClick={handleNextReto}
            className="arrow arrow-right"
          />
          {videoUrl ? (
            <div className="video-wrapper">
       

              <div className="video-focused">
              <video className="video" ref={videoRef} autoPlay key={completedDares[currentReto]?.videoUrl}>
                <source src={completedDares[currentReto]?.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
                <button className="play-pause-button" onClick={handlePlayPause}>
                  {videoRef.current && videoRef.current.paused ? "Play" : "Pause"}
                </button>
              </div>
            </div>
          ) : (
            "Loading..."
          )}
        </div>
        <div className="columna columna2">
          <div className="comment-section">
            <div className="comments-container">
              {comments.map((comment, index) => (
                <div className="comment" key={index}>
                  <p>{comment.text}</p>
                  <p>Hecho por: {comment.userId}</p>
                  {isAdmin && (
            <button onClick={() => handleDeleteComment(comment.id)}>Eliminar</button>
          )}
                </div>
              ))}
            </div>
            <form onSubmit={handleCommentSubmit}>
  <div className="send-container">
    <input
      type="text"
      placeholder="Deja un comentario"
      className="flex-1 mr-2 rounded-input"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      required
    />
     <button className="send" type="submit">
      <img src={send} alt="Enviar" />
    </button>
  </div>
</form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DareVideo1;