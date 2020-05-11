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

const Series = ({
  color,
  data,
  valueAccessor,
  dateAccessor,
  high,
  low,
  height,
}) => {
  const { domain } = useContext(TimelineContext);
  const { bufferWidth, width } = useContext(BufferContext);

  const xScale = scaleTime(domain, [0, width - bufferWidth]);
  const yScale = scaleLinear([low, high], [height, 0]);
  
  const lineWith = line()
    .x((d) => xScale(new Date(dateAccessor(d))))
    .y((d) => yScale(valueAccessor(d)));

  return (
    <g>
      <SeriesLine color={color} d={lineWith(data)} />
    </g>
  );
};

export default Series;
