import React, { useContext } from "react";
import styled from "styled-components";

import { line } from "d3-shape";
import { scaleTime, scaleLinear } from "d3-scale";

import BufferContext from "../../bufferContext";
import TimelineContext from "../../timelineContext";

const SeriesLine = styled.path`
  fill: none;
  stroke: ${(props) => props.color};
`;

const LineSeries = ({
  color,
  values,
  high,
  low,
  height,
}) => {
  const { domain } = useContext(TimelineContext);
  const { bufferWidth, width } = useContext(BufferContext);

  const xScale = scaleTime(domain, [0, width - bufferWidth]);
  const yScale = scaleLinear([low, high], [height, 0]);
  
  const lineWith = line()
    .x((d) => xScale(new Date(d.time)))
    .y((d) => yScale(d.value));

  return (
    <g>
      <SeriesLine color={color} d={lineWith(values)} />
    </g>
  );
};

export default LineSeries;
