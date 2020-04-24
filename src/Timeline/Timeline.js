import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { AxisBottom } from "d3-components";

import TimelineContext from "../contexts/timelineContext";
import BufferWidthContext from "../contexts/bufferContext";
import { timeMonth, timeWeek, select, axisBottom, timeDay, timeHour, timeMinute, timeFormat } from "d3";

const TimelineWrapper = styled.svg`
  background: #ddd;
`;

const Timeline = (props) => {
  const { timeScale, setFullDomain } = useContext(TimelineContext);
  const { width, bufferWidth, diagramWidth } = useContext(BufferWidthContext);

  useEffect(() => {
    setFullDomain([props.startTime, props.endTime]);
  }, [props.startTime, props.endTime]);

  return (
    <TimelineWrapper width={width} height={40}>
      <g transform={`translate(${bufferWidth} 0)`}>
        <AxisBottom scale={timeScale} tickSize={20} color="#333"/>
        {/* <g ref={primaryAxisRef} /> */}
      </g>
    </TimelineWrapper>
  );
};

Timeline.propTypes = {
  startTime: PropTypes.instanceOf(Date).isRequired,
  endTime: PropTypes.instanceOf(Date).isRequired,
};

export default Timeline;
