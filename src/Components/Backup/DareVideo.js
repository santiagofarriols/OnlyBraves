import React, { useState, useEffect } from "react";
import db, { storage } from '../../firebase_setup/firebase';
import "../Styles/HomePage1.css";
import next from "../Multimedia/next.png";
import previous from "../Multimedia/previous.png";
import like from "../Multimedia/like.png";
import comments1 from "../Multimedia/comments.png"
import "../Styles/FranklinAve.ttf";

function DareVideo() {
  const [currentReto, setCurrentReto] = useState(0);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const retos = [
    { title: "Comete una cusadcaracha", video: "video1.mp4" },
    { title: "asdasdas", video: "video2.mp4" },
    {
      title: "Hacer una rutina de baile en público",
      video: "video3.mp4",
    },
  ];

  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    storage
      .ref()
      .child("videos/video4.mp4")
      .getDownloadURL()
      .then((url) => setVideoUrl(url));
  }, []);


  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handlePreviousReto = () => {
    if (currentReto > 0) {
      setCurrentReto(currentReto - 1);
    }
  };

  const handleNextReto = () => {
    if (currentReto < retos.length - 1) {
      setCurrentReto(currentReto + 1);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, comment]);
    setComment("");
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 80px)" }}>

    <div style={{ width: "20%", display: "flex",  minHeight:"150px" }}>
      
      <div style={{  backgroundColor: "orange", position: "relative",minHeight:"150px"  }}>
        <img src={previous}
          alt="Button"
          onClick={handlePreviousReto} className="arrow arrow-left" style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }} />
      </div>
    </div>
    <div style={{ width: "1.5px", display: "flex",  height:"100%", backgroundColor:"#df8c97" }}></div>

    <div style={{ width: "60%",height: "calc(100vh - 80px)",minHeight:"556px", boxSizing: "border-box", display: "flex", justifyContent: "space-between", alignItems: "center" , minHeight:"600px",flexDirection: "column", boxSizing: "border-box", padding: "10px",}}>
      
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", margin:"10px" }}>
        <h1 className="title">
          <span className="titleRetoRed">Reto: </span>
          <span className="titleReto">{retos[currentReto].title}</span>
        </h1>
        </div>

        <div style={{ height: "calc(70vh - 80px)" ,  minHeight:"556px", boxSizing: "border-box", padding: "0px", display: "flex", justifyContent: "space-between", alignItems: "end" , minHeight:"440px",flexDirection: "column", boxSizing: "border-box", padding: "10px",}}>
        <div style={{ height: "calc(70vh - 80px)" ,  minHeight:"556px", boxSizing: "border-box", padding: "0px", display: "flex", justifyContent: "space-between", alignItems: "end" , minHeight:"440px",flexDirection: "row", boxSizing: "border-box", padding: "10px",}}>
      {videoUrl ? (
            <video className="video" controls> 
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            "Loading..."
          )}


<div className="like-wrapper">
        <img src={like} alt="Like" onClick={handleLike} className="like" />

        <p className="like-count">
         <span>{likes}</span>
        </p>
        <img src={comments1} alt="Like" onClick={handleLike} className="like" />

<p className="like-count">
 <span>{likes}</span>
</p>
      </div>
      </div>
      <div className="comment-section">
        <form
          
          onSubmit={handleCommentSubmit}
        >
          <div>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Leave a comment"
              className="flex-1 mr-2"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>

        <div>
          {comments.map((comment, index) => (
            <p className="comment" key={index}>
              {comment}
            </p>
          ))}
        </div>
      </div>
      </div>
    </div>

    <div style={{ width: "1.5px", display: "flex",  height:"100%", backgroundColor:"#df8c97" }}></div>
    <div style={{ width: "20%",  height: "100%", boxSizing: "border-box", padding: "10px", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>

      <div style={{  backgroundColor: "orange", position: "relative",minHeight:"150px"  }}>
      
        <img
          src={next}
          alt="Button"
          onClick={handleNextReto}
          className="arrow arrow-right"
        />

        </div>
    </div>
  </div>
  );
}
export default DareVideo;