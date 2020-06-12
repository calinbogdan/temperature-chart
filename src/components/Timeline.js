import React, { useRef, useEffect, useContext } from "react";
import { axisTop, axisBottom } from "d3-axis";
import { select } from "d3-selection";
import { scaleTime } from "d3-scale";

import TimelineContext from "./timelineContext";
import BufferContext from "./bufferContext";
import styled from "styled-components";

const TIMELINE_HEIGHT = 40;

const Ticks = styled.g`
  .domain {
    display: none;
  }
`;

const Timeline = ({ width, ticksHeight }) => {
  const { timeScale } = useContext(TimelineContext);
  const { bufferWidth } = useContext(BufferContext);
  const axisRef = useRef();
  const ticksRef = useRef();

  useEffect(() => {
    select(axisRef.current).call(axisTop(timeScale));
    select(ticksRef.current).call(
      axisBottom(timeScale).tickSize(ticksHeight).tickFormat("")
    );
  }, [timeScale]);

  return (
    <svg overflow="visible" height={TIMELINE_HEIGHT} width={width} style={{display: 'block'}}>
      <rect height="100%" width="100%" fill="#ddd" />
      <Ticks
        color="#ddd"
        transform={`translate(${bufferWidth} ${TIMELINE_HEIGHT - 1})`}
        ref={ticksRef}
      />
      <g
        transform={`translate(${bufferWidth} ${TIMELINE_HEIGHT - 1})`}
        ref={axisRef}
      />
    </svg>
  );
};

Timeline.defaultProps = {
  ticksHeight: 0
};

export default Timeline;
