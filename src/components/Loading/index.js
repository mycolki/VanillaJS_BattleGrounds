import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";

/*

  TODO: 아래 Loading 컴포넌트를 함수형 컴포넌트로 수정하고, `/spec/Loading.spec.js`에 테스트 내용을 보강하세요.

 */

export default function Loading({ text }) {
  const [loadingText, setLoadingText] = useState(text);

  useEffect(() => {
    const { speed, texts } = text;

    const clearID = window.setInterval(() => {
      loadingText === texts + "..s."
        ? setLoadingText(texts)
        : setLoadingText(prevText => prevText + ".")
    }, speed);

    return () => {
      clearInterval(clearID);
    }
  }, [loadingText, text]);

  return <p className="content">{loadingText}</p>;

}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
  text: "Loading",
  speed: 300,
};
