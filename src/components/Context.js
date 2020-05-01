import React, { useState } from "react";
import PropTypes from "prop-types";

// import TimelineContext from "./timelineContext";
import BufferContext from "./bufferContext";

import Timeline from "./Timeline";
import { TimelineProvider } from "./timelineContext";

const AXIS_WIDTH = 40;
const Context = (props) => {
  const [bufferWidth, setBufferWidth] = useState(0);

  return (
    <div>
      <BufferContext.Provider
        value={{
          width: props.width,
          bufferWidth,
          diagramWidth: props.width - bufferWidth,
          setSeriesCount: (count) => setBufferWidth(count * AXIS_WIDTH),
        }}
      >
        <TimelineProvider startDate={props.startDate} endDate={props.endDate}>
          <Timeline width={props.width} />
          {props.children}
        </TimelineProvider>
      </BufferContext.Provider>
    </div>
  );
};

Context.propTypes = {
  width: PropTypes.number,
};

export default Context;
