import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { axisTop } from "d3-axis";
import { select } from "d3-selection";
import { scaleTime } from "d3-scale";

const SCALE_DOMAIN = [new Date("15 Feb 1998"), new Date("15 Feb 2020")];

const TIMELINE_HEIGHT = 40;

const Timeline = ({ width }) => {
  const axisRef = useRef();

  useEffect(() => {
    select(axisRef.current).call(
      axisTop(scaleTime(SCALE_DOMAIN, [0, width]))
    );
  }, []);

  return (
    <svg height={TIMELINE_HEIGHT} width={width}>
      <rect height="100%" width="100%" fill="#ddd"/>
      <g transform={`translate(0 ${TIMELINE_HEIGHT - 1})`} ref={axisRef} />
    </svg>
  );
};

const Context = (props) => {
  return (
    <div>
      <Timeline width={props.width} />
      {props.children}
    </div>
  );
};

Context.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

export default Context;
