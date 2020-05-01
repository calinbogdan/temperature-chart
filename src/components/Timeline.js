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

const Timeline = ({ width }) => {
  const { timeScale } = useContext(TimelineContext);
  const { bufferWidth } = useContext(BufferContext);
  const axisRef = useRef();
  const ticksRef = useRef();

  useEffect(() => {
    select(axisRef.current).call(axisTop(timeScale));
    select(ticksRef.current).call(
      axisBottom(timeScale).tickSize(300).tickFormat("")
    );
  }, [timeScale]);

  return (
    <svg overflow="visible" height={TIMELINE_HEIGHT} width={width}>
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

export default Timeline;
