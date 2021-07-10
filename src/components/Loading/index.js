import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";

export default function Loading({ text, speed }) {
  const [contents, setContents] = useState(text);

  useEffect(() => {
    const clearID = window.setInterval(() => {
      contents === text + "..."
        ? setContents(text)
        : setContents(prevText => prevText + ".");
    }, speed);

    return () => {
      clearInterval(clearID);
    }
  }, [contents, speed, text]);

  return <h1 className="centerText">{contents}</h1>;
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
  text: "Loading",
  speed: 300,
};
