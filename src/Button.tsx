import React from "react";

interface ButtonProps {
    buttonId: string,
    buttonClass: string,
    imageName: string,
    buttonFunc: () => void,
    imageDirection: number;
}

const Button: React.FunctionComponent<ButtonProps> = ({ buttonId, buttonClass = "", imageName, buttonFunc, imageDirection=0}) => {
    return (
        <>
          <button id={buttonId} className={buttonClass} style={
          {backgroundColor: "transparent",
          border: "none",
          outline: "none",
          cursor: "pointer",
          transform: "rotate(" + imageDirection + "deg)"}
        } onClick={buttonFunc}>
            <img id={buttonId + "Img"} src={imageName} />
          </button>
        </>
    );
};

export default Button;