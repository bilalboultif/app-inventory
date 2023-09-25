import React from "react";
import loaderImg from "../../assets/loading.gif";
import ReactDOM from "react-dom";
import "./Loader.scss";
import Lottie from 'react-lottie';
import animationData from '../../assets/loading.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
      <Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
        speed={1.5}
      />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const SpinnerImg = () => {
  return (
    <div className="--center-all">
      <img src={loaderImg} alt="Loading..." width={200} height={200}  />
    </div>
  );
};

export default Loader;
