import React, { useState } from "react";
import PropTypes from "prop-types";

import TimelineContext from "./timelineContext";
import BufferContext from "./bufferContext";

import Timeline from "./Timeline";

const AXIS_WIDTH = 40;
const Context = (props) => {
  const [domain, setDomain] = useState([props.startDate, props.endDate]);
  const [bufferWidth, setBufferWidth] = useState(0);

  return (
    <div>
      <BufferContext.Provider
        value={{
          width: props.width, 
          bufferWidth,
          setSeriesCount: (count) => setBufferWidth(count * AXIS_WIDTH),
        }}
      >
        <TimelineContext.Provider value={{ domain }}>
          <Timeline width={props.width} />
          {props.children}
        </TimelineContext.Provider>
      </BufferContext.Provider>
    </div>
  );
};

Context.propTypes = {
  width: PropTypes.number,
};

export default Context;
