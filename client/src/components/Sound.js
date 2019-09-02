import React from "react";

export default function(props) {

  const soundfile = require(`../assets/sounds/${props.id}.mp3`);

  return (
    <div className="audio">
      <p className="audio-title">{props.title}</p>
      <audio controls>
        <source src={soundfile}type="audio/mpeg" />
      </audio>
    </div>
  )
}