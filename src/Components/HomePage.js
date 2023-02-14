import React, { useState, useEffect } from "react";
import "firebase/compat/storage";
import firebase from "firebase/compat/app";
import "../Styles/HomePage1.css";
import next from "../Multimedia/next.png";
import previous from "../Multimedia/previous.png";
import like from "../Multimedia/like.png";
import logob from "../Multimedia/LogoBlack.png";
import "../Styles/FranklinAve.ttf";
const storage1 = firebase.storage().ref();

function HomePage() {
  const [currentReto, setCurrentReto] = useState(0);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const retos = [
    { title: "Comete una cucaracha", video: "video1.mp4" },
    { title: "asdasdas", video: "video2.mp4" },
    {
      title: "Hacer una rutina de baile en público",
      video: "video3.mp4",
    },
  ];

  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    firebase
      .storage()
      .ref()
      .child("videos/WhatsApp Video 2023-01-21 at 08.38.00.mp4")
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
    <div className="container1">
      <div className="container">
        <div className="arrowContainer">
          <img
            src={previous}
            alt="Button"
            onClick={handlePreviousReto}
            className="arrow arrow-left"
          />
        </div>
        <h1 className="title">
  <span className="titleRetoRed">Reto: </span>
  <span className="titleReto">{retos[currentReto].title}</span>
</h1>
<img src={logob} alt="Like" onClick={handleLike} className="logob" />
        <div className="videoContainer">
          {videoUrl ? (
            <video className="video" controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            "Loading..."
          )}
        </div>
        <div className="like-wrapper">
          <img src={like} alt="Like" onClick={handleLike} className="like" />
          
          <p className="like-count">Likes: <span className="ml-5">{likes}</span></p>
        
        </div>
        <div className="comment-section">
          <form
            className="focus:outline-none focus:shadow-outline rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            onSubmit={handleCommentSubmit}
          >
            <div class="flex">
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

        <div className="arrowContainer">
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
export default HomePage;
