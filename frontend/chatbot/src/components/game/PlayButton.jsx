import React from "react";

const PlayButton = ({ onClick }) => {
  return (
    <button className="play-button" onClick={onClick}>
      Start Adventure!
    </button>
  );
};

export default PlayButton;
