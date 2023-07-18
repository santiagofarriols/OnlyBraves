import React, { useState, useEffect, useRef } from "react";
import db, { storage, auth } from '../firebase_setup/firebase'; 
import { getFirestore, collection, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore"; 
import "../Styles/HomePage1.css";
import next from "../Multimedia/next.png";
import previous from "../Multimedia/previous.png";
import like from "../Multimedia/like.png";
import comments1 from "../Multimedia/comments.png"
import "../Styles/FranklinAve.ttf";
import '../Styles/DareVideo1.css';
import '../Styles/CommentForm.css';
import send from '../Multimedia/SEND.png';

const DareVideo1 = () => {
  const [currentReto, setCurrentReto] = useState(0);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [completedDares, setCompletedDares] = useState([]);
  const videoRef = useRef();

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
    const videoId = completedDares[currentReto]?.id;
  
    if (videoId) {
      // Reinicia el estado de los comentarios
      setComments([]);
      
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

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

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
      timestamp: serverTimestamp(),
    };

    try {
      await db.collection('comments').add(commentData);
      setComments([...comments, commentData]);
      setComment("");
    } catch (error) {
      console.error("Error subiendo el comentario: ", error);
    }
  };

  return (
    <div className="container3">
      <div className="title-container">
        <h1 className="title">
          <span className="titleRetoRed">Reto: </span>
          <span className="titleReto">{completedDares[currentReto]?.title}</span>
        </h1>
        <h2 className="price">
        Precio: {completedDares[currentReto]?.price}
      </h2>
      </div>
      <div className="frame">
        <div className="columna columna1">
          <img src={previous}
            alt="Button"
            onClick={handlePreviousReto} className="arrow arrow-left" style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }} />
          <img
            src={next}
            alt="Button"
            onClick={handleNextReto}
            className="arrow arrow-right"
          />
          {completedDares[currentReto]?.videoUrl ? (
            <div className="video-wrapper">
              <video className="video" ref={videoRef} autoPlay>
                <source src={completedDares[currentReto]?.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <button className="play-pause-button" onClick={handlePlayPause}>
                {videoRef.current && videoRef.current.paused ? "Play" : "Pause"}
              </button>
            </div>
          ) : (
            "Loading..."
          )}
        </div>
        <div className="columna columna2">
          <div className="comment-section">
            <div className="comments-container">
              {comments.map((comment, index) => (
                <p className="comment" key={index}>
                  {comment.text}
                </p>
              ))}
            </div>
            <form onSubmit={handleCommentSubmit}>
              <div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DareVideo1;