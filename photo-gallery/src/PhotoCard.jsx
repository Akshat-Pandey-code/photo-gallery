import React, { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import "./index.css";

const PhotoCard = ({ photo }) => {
  const [likes, setLikes] = useState(0);

  return (
    <div className="photo-card">
      <img src={photo.download_url} alt={photo.author} className="photo-img" />
      <div className="photo-info">
        <span className="author-text">Author: {photo.author}</span>
        <div className="like-section" onClick={() => setLikes(likes + 1)}>
          <FaThumbsUp className="like-icon" />
          <span className="like-count">{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
