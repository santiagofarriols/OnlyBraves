import React, { useState, useRef } from "react";
import video1 from "../Multimedia/video1.mp4";
import video2 from "../Multimedia/video2.mp4";
import video3 from "../Multimedia/video3.mp4";
import video4 from "../Multimedia/video4.mp4";

import "../Styles/DirtyBrush.ttf";
import "../Styles/VideoPlayer.css";

import bg1 from "../Multimedia/backgroundrotated.png";

function HomePage({ toggleHome }) {
  const videos = [
    video1,
    video2,
    video3,
    video4,
    video1,
    video1,
    video2,
    video3,
    video4,
    video1,
    video1,
    video2,
    video3,
    video4,
    video1,
    video1,
    video2,
    video3,
    video4,
    video1,
    video1,
    video2,
    video3,
    video4,
    video1,
    video1,
    video2,
    video3,
    video4,
    video1,
    video1,
    video2,
    video3,
    video4,
    video1,
  ];
  const [hover, setHover] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

 

  const playMovie = (e) => {
    e.target.play();
    
    
  }

  const stopMovie = (e) => {
    setTimeout(() => {
      e.target.pause();
    }, 1000);
    
    
  }
  //className="  h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 -z-10"   >
  return (
    <div
      style={{
        height: "91.7vh",
        backgroundImage: `url(${bg1})`,
        marginTop: "0px",
        overflow: "hidden",

        position: "fixed",
      }}
    >
      
      <div
        style={{
          height: "00px",
          position: "absolute",
          top: "300",
          right: "0",
          marginRight: "100px",
          backgroundColor: "blue",
          fontSize: "200px",
          color: "#f3c016",
          fontFamily: "Dirty Brush",
          zIndex: "2",
          
    textShadow:"-2px 4px 2px black"
        }}
      >
        Only Braves
      </div>

      <div
        style={{
          transform: `rotate(${20}deg)`,
          width: "70%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          marginTop: "-300px",
          marginLeft: "-150px",
          
          zIndex: "-1",

          //animation: "move-up-down 2s ease-in-out infinite alternate",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
            gridTemplateRows: "1fr 1fr 1fr 1fr",
            gridGap: "20px",
            columnGap: "30px",
          }}
        >
          {videos.map((video, index) => (
            <video
              key={index}
              ref={videoRef}
              src={video}
              style={{
                borderRadius: "15px",
                gridColumn: `${(index % 7) + 1} / span 1`,
                gridRow: `${Math.floor(index / 7) + 1} / span 1`,

                transform: `scale(${
                  hover && hoveredVideo === index ? 1.5 : 1
                })`,
                opacity: hoveredVideo === index ? 1 : 0.85,
                zIndex: hoveredVideo === index ? 1 : 0,
                transition: "all 0.2s ease-in-out ",
              }}
              autoPlay={isPlaying}
              
              muted
              loop
              onClick={toggleHome}
              onMouseEnter={() => {
                setHover(true);
                setHoveredVideo(index);
                setIsPlaying(true);
                
                videoRef.current.play();
              }}
              onMouseLeave={() => {
                setHover(false);
                setHoveredVideo(null);
                
              }}
              onMouseOver={playMovie}
              onMouseOut={stopMovie}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
