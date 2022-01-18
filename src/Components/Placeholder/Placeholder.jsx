import React from "react";
import preloader from "../../Static/preloader/Gear_for_loadin_file_light.svg";

const Placeholder = ({ message }) => {
  const divStyles = {
    position: "absolute",
    width: "calc(100% - 340px)",
    height: "100%",
    right: "0",
    backgroundColor: "rgb(236, 236, 236)",
  };

  const imgStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <div style={divStyles}>
      <div style={imgStyles}>
        <img src={preloader} alt="" />
        <h1>Preparing . . .</h1>
      </div>
    </div>
  );
};

export default Placeholder;
