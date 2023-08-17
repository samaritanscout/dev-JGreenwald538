import React from "react";



const Text = ({ id, className = "", text }) => {
  if(text === "" || text === "-\n\t\t  ") return;
  if(!text.includes(":")){
    return (
      <p id={id} className={className}>
        {text}
      </p>
    );
  } else {
    return (
      <p id={id} className={className}>
        <b>{text.substring(0, text.indexOf(":")+1)}</b>
        {text.substring(text.indexOf(":")+1)}
      </p>
    );
  }
};

export default Text;