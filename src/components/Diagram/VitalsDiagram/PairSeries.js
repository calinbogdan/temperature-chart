import React, { useContext } from "react";
import styled from "styled-components";

import { line, area } from "d3-shape";
import { scaleTime, scaleLinear } from "d3-scale";

import BufferContext from "../../bufferContext";
import TimelineContext from "../../timelineContext";

const SeriesLine = styled.path`
  fill: none;
  stroke: ${(props) => props.color};
`;

function getGrouped(top, bottom) {
  return top.map((value, index) => ({
    top: value,
    bottom: bottom[index],
  }));
}

const PairSeries = ({
  color,
  topValues,
  bottomValues,
  topHigh,
  topLow,
  bottomHigh,
  bottomLow,
  height,
  areaVisible,
}) => {
  const { domain } = useContext(TimelineContext);
  const { bufferWidth, width } = useContext(BufferContext);

  const xScale = scaleTime(domain, [0, width - bufferWidth]);

  const yTopScale = scaleLinear([topLow, topHigh], [height, height / 2]);
  const yBottomScale = scaleLinear([bottomLow, bottomHigh], [height / 2, 0]);

  const topLine = line()
    .x((d) => xScale(new Date(d.time)))
    .y((d) => yTopScale(d.value));

  const bottomLine = line()
    .x((d) => xScale(new Date(d.time)))
    .y((d) => yBottomScale(d.value));

  if (areaVisible) {
    const areaGen = area()
      .x((d) => xScale(new Date(d.top.date)))
      .y0((d) => yBottomScale(d.bottom.value))
      .y1((d) => yTopScale(d.top.value));

    const grouped = getGrouped(topValues, bottomValues);

    return (
      <g>
        <SeriesLine color={color} d={topLine(topValues)} />
        {areaVisible && <path fill={color} opacity={0.6} d={areaGen(grouped)} />}
        <SeriesLine color={color} d={bottomLine(bottomValues)} />
      </g>
    );
  }

  return (
    <g>
      <SeriesLine color={color} d={topLine(topValues)} />
      <SeriesLine color={color} d={bottomLine(bottomValues)} />
    </g>
  );
};

export default PairSeries;
