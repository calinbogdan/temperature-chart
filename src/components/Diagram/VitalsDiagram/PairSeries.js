import React, { useContext } from "react";
import styled from "styled-components";

import { line, area } from "d3-shape";
import { scaleLinear } from "d3-scale";

import TimelineContext from "../../timelineContext";

const SeriesLine = styled.path`
  fill: none;
  stroke: ${(props) => props.color};
  stroke-width: ${(props) => props.focused ? 2 : 1};
  opacity: ${(props) => props.focused ? 1 : 0.5 };
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
  focused
}) => {
  const { timeScale } = useContext(TimelineContext);

  const yTopScale = scaleLinear([topLow, topHigh], [height, height / 2]);
  const yBottomScale = scaleLinear([bottomLow, bottomHigh], [height / 2, 0]);

  const topLine = line()
    .x((d) => timeScale(new Date(d.time)))
    .y((d) => yTopScale(d.value));

  const bottomLine = line()
    .x((d) => timeScale(new Date(d.time)))
    .y((d) => yBottomScale(d.value));

  if (areaVisible) {
    const areaGen = area()
      .x((d) => timeScale(new Date(d.top.time)))
      .y0((d) => yBottomScale(d.bottom.value))
      .y1((d) => yTopScale(d.top.value));

    const grouped = getGrouped(topValues, bottomValues);

    return (
      <g>
        <SeriesLine color={color} d={topLine(topValues)} focused={focused}/>
        {areaVisible && (
          <path fill={color} opacity={focused ? 0.6 : 0.3} d={areaGen(grouped)} />
        )}
        <SeriesLine color={color} d={bottomLine(bottomValues)} focused={focused}/>
      </g>
    );
  }

  return (
    <g>
      <SeriesLine color={color} d={topLine(topValues)} focused={focused}/>
      <SeriesLine color={color} d={bottomLine(bottomValues)} focused={focused}/>
    </g>
  );
};

export default React.memo(PairSeries);
