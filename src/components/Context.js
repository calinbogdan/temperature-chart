import React, { useState, Children, useEffect } from "react";
import PropTypes from "prop-types";

// import TimelineContext from "./timelineContext";
import BufferContext from "./bufferContext";

import Timeline from "./Timeline";
import { TimelineProvider } from "./timelineContext";

const AXIS_WIDTH = 40;
const MEDICATION_BUFFER_WIDTH = 200;

const Context = (props) => {
  const [bufferWidth, setBufferWidth] = useState(0);

  useEffect(() => {
    const children = Children.toArray(props.children);
    console.log(children);
    
    const medicationBufferWidth = anyMedicationDiagram(children) ? MEDICATION_BUFFER_WIDTH : 0;
    const vitalsAxesLengths = children.map(diagram => {
      if (diagram.type.name === "VitalsDiagram") {
        return diagram.props.series.length * AXIS_WIDTH;
      }
      return 0;
    });
    const vitalsBufferWidth = Math.max(...vitalsAxesLengths);
    setBufferWidth(Math.max(vitalsBufferWidth, medicationBufferWidth));
  }, [props.children]);

  return (
    <div>
      <BufferContext.Provider
        value={{
          width: props.width,
          bufferWidth,
          diagramWidth: props.width - bufferWidth,
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
function anyMedicationDiagram(children) {
  return children.some(
    (c) => c.type.name === "MedicationDiagram"
  );
}

