import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { AxisBottom } from "d3-components";

import TimelineContext from "../contexts/timelineContext";
import BufferWidthContext from "../contexts/bufferContext";

const TimelineWrapper = styled.svg`
  background: #ddd;
`;

const Timeline = (props) => {
  const { timeScale, setFullDomain } = useContext(TimelineContext);
  const { width } = useContext(BufferWidthContext);

  useEffect(() => {
    setFullDomain([props.startTime, props.endTime]);
  }, [props.startTime, props.endTime]);

  return (
    <TimelineWrapper width={1450} height={40}>
      <g transform={`translate(${width} 0)`}>
        <AxisBottom scale={timeScale} tickSize={40} color="#888" noText />
      </g>
    </TimelineWrapper>
  );
};

Timeline.propTypes = {
  startTime: PropTypes.instanceOf(Date).isRequired,
  endTime: PropTypes.instanceOf(Date).isRequired,
};

export default Timeline;
