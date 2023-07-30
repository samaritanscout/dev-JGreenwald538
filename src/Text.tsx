import React from "react";

interface TextProps {
  id: string;
  className?: string;
  text: string;
}

const Text: React.FunctionComponent<TextProps> = ({ id, className = "", text }) => {
  return (
    <>
      <p id={id} className={className}>
        {text}
      </p>
    </>
  );
};

export default Text;