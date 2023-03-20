import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  };

  let dots;

  switch (props.value) {
    case 1:
      dots = <div className="dot center-dot"></div>;
      break;
    case 2:
      dots = (
        <div>
          <div className="dot top-center-dot"></div>
          <div className="dot bottom-center-dot"></div>
        </div>
      );
      break;
    case 3:
      dots = (
        <div>
          <div className="dot top-left-dot"></div>
          <div className="dot center-dot"></div>
          <div className="dot bottom-right-dot"></div>
        </div>
      );
      break;
    case 4:
      dots = (
        <div>
          <div className="dot top-left-dot"></div>
          <div className="dot top-right-dot"></div>
          <div className="dot bottom-left-dot"></div>
          <div className="dot bottom-right-dot"></div>
        </div>
      );
      break;
    case 5:
      dots = (
        <div>
          <div className="dot top-left-dot"></div>
          <div className="dot top-right-dot"></div>
          <div className="dot center-dot"></div>
          <div className="dot bottom-left-dot"></div>
          <div className="dot bottom-right-dot"></div>
        </div>
      );
      break;
    case 6:
      dots = (
        <div>
          <div className="dot top-left-dot"></div>
          <div className="dot top-center-dot"></div>
          <div className="dot top-right-dot"></div>
          <div className="dot bottom-left-dot"></div>
          <div className="dot bottom-center-dot"></div>
          <div className="dot bottom-right-dot"></div>
        </div>
      );
      break;
    default:
      dots = null;
  }

  return (
    // <div
    //     className="die-face"
    //     style={styles}
    //     onClick={props.holdDice}
    // >
    //     <h2 className="die-num">{props.value}</h2>
    // </div>
    <div className="die-face" style={styles} onClick={props.holdDice}>
      {dots}
    </div>
  );
}
