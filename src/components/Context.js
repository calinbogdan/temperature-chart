import React, { useRef, useEffect, useState, useReducer, createContext, useContext } from "react";
import PropTypes from "prop-types";
import { axisTop } from "d3-axis";
import { select } from "d3-selection";
import { scaleTime } from "d3-scale";

import TimelineContext from "./timelineContext";

const TIMELINE_HEIGHT = 40;

const Timeline = ({ width }) => {
  const { domain } = useContext(TimelineContext);
  const axisRef = useRef();

  useEffect(() => {
    select(axisRef.current).call(
      axisTop(scaleTime(domain, [0, width]).nice())
    );
  }, []);

  return (
    <svg height={TIMELINE_HEIGHT} width={width}>
      <rect height="100%" width="100%" fill="#ddd" />
      <g transform={`translate(0 ${TIMELINE_HEIGHT - 1})`} ref={axisRef} />
    </svg>
  );
};

const Context = (props) => {
  const [domain, setDomain] = useState([props.startDate, props.endDate]);

  return (
    <div>
      <TimelineContext.Provider value={{domain}}>
        <Timeline width={props.width} />
        {props.children}
      </TimelineContext.Provider>
    </div>
  );
};

Context.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

export default Context;
