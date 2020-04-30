import React, { useRef, useEffect, useContext } from "react";
import { axisTop } from "d3-axis";
import { select } from "d3-selection";
import { scaleTime } from "d3-scale";

import TimelineContext from "./timelineContext";
import BufferContext from "./bufferContext";

const TIMELINE_HEIGHT = 40;

const Timeline = ({ width }) => {
  const { domain } = useContext(TimelineContext);
  const { bufferWidth } = useContext(BufferContext);
  const axisRef = useRef();

  useEffect(() => {
    select(axisRef.current).call(axisTop(scaleTime(domain, [0, width]).nice()));
  }, []);

  return (
    <svg height={TIMELINE_HEIGHT} width={width}>
      <rect height="100%" width="100%" fill="#ddd" />
      <g
        transform={`translate(${bufferWidth} ${TIMELINE_HEIGHT - 1})`}
        ref={axisRef}
      />
    </svg>
  );
};

export default Timeline;
