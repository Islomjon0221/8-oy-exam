import React, { useState, useEffect } from 'react';
import LikedH from "../assets/Heart_Fill_XS.svg"
import likeH from "../assets/Heart_XS.svg"

const LikeButton = ({ song }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const isLiked = localStorage.getItem(`liked-${song.id}`);
    if (isLiked) {
      setLiked(true);
    }
  }, [song.id]);

  const handleLike = () => {
    if (liked) {
      localStorage.removeItem(`liked-${song.id}`);
    } else {
      localStorage.setItem(`liked-${song.id}`, JSON.stringify(song));
    }
    setLiked(!liked);
  };

  return (
    <img 
      onClick={handleLike} 
      width={24}
      src={liked ?  LikedH : likeH}
    />
  );
};

export default LikeButton;
