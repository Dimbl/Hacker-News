import React from "react";

function Logo() {
  return (
    <div style={{border: '2px solid white', width: '50px', height: '50px', margin: '0 20px'}}>
      <svg
        viewBox="0 0 100 100"
        width="50"
        height="50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0"
          y="0"
          width="90"
          height="0"
          fill="rgb(255, 102, 0)"
        ></rect>
        <path
          d="M 50 77 L 50 50 "
          fill="none"
          stroke="rgb(255, 255, 255)"
          strokeWidth="8.78662150719729"
          strokeLinecap="butt"
        ></path>
        <path
          d="M 94.93056731583404 35.622745513916016 L 71.2454833984375 71.2454833984375 "
          fill="none"
          stroke="rgb(255, 255, 255)"
          strokeWidth="8.78662150719729"
          strokeLinecap="butt"
          transform="matrix(1 0 0 1 -21.2455 -21.2455)"
        ></path>
        <path
          d="M -78.93056731583404 36.17028045654297 L -55.67118835449219 71.79300689697266 "
          fill="none"
          stroke="rgb(255, 255, 255)"
          strokeWidth="8.78662150719729"
          strokeLinecap="butt"
          transform="matrix(1 0 0 1 105.396 -21.7213)"
        ></path>
        <rect
          transform=""
          width="90"
          height="23.742591024555463"
          strokeWidth="1"
          stroke="none"
          fill="#FF6600"
          strokeOpacity="1"
          fillOpacity="1"
          stroke-Linecap="butt"
          strokeLinejoin="miter"
        ></rect>
      </svg>
    </div>
  );
}

export default Logo;
