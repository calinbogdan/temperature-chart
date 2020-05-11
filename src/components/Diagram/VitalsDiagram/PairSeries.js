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

const PairSeries = ({
  color,
  topValues, 
  bottomValues,
  valueAccessor,
  dateAccessor,
  topHigh,
  topLow,
  bottomHigh,
  bottomLow,
  height,
}) => {
  const { domain } = useContext(TimelineContext);
  const { bufferWidth, width } = useContext(BufferContext);

  const xScale = scaleTime(domain, [0, width - bufferWidth]);

  const yTopScale = scaleLinear([topLow, topHigh], [height, height / 2]);
  const yBottomScale = scaleLinear([bottomLow, bottomHigh], [height / 2, 0]);

  const topLine = line()
    .x((d) => xScale(new Date(dateAccessor(d))))
    .y(d => yTopScale(valueAccessor(d)));

  const bottomLine = line()
  .x((d) => xScale(new Date(dateAccessor(d))))
  .y(d => yBottomScale(valueAccessor(d)));

  return <g>
    <SeriesLine color={color} d={topLine(topValues)}/>
    <SeriesLine color={color} d={bottomLine(bottomValues)}/>
  </g>;
};

export default PairSeries;
