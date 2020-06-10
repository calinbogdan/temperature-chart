import React from "react";

const ValueDot = (props) => (
  <circle r={3} stroke={props.color} fill="white" cx={props.cx} cy={props.cy} />
);

export default ValueDot;
