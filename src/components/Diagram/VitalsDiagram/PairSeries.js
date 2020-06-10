import React, { useContext } from "react";
import styled from "styled-components";

import { line, area } from "d3-shape";
import { scaleLinear } from "d3-scale";

import TimelineContext from "../../timelineContext";
import valueWithin from "./valueWithinFilter";
import { DangerRange, WarningRange, NormalRange } from "./ranges";
import ValueDot from "./ValueDot";

const SeriesLine = styled.path`
  fill: none;
  stroke: ${(props) => props.color};
  stroke-width: ${(props) => (props.focused ? 2 : 1)};
  opacity: ${(props) => (props.focused ? 1 : 0.5)};
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
  focused,
  normalRangeTop,
  normalRangeBottom,
  warningRangeTop,
  warningRangeBottom,
}) => {
  const { timeScale, domain } = useContext(TimelineContext);

  const yTopScale = scaleLinear([topLow, topHigh], [height, height / 2]);
  const yBottomScale = scaleLinear([bottomLow, bottomHigh], [height / 2, 0]);

  const topLine = line()
    .x((d) => timeScale(new Date(d.time)))
    .y((d) => yTopScale(d.value));

  const bottomLine = line()
    .x((d) => timeScale(new Date(d.time)))
    .y((d) => yBottomScale(d.value));

  let seriesArea = null;
  if (areaVisible) {
    const areaGen = area()
      .x((d) => timeScale(new Date(d.top.time)))
      .y0((d) => yBottomScale(d.bottom.value))
      .y1((d) => yTopScale(d.top.value));

    const grouped = getGrouped(topValues, bottomValues);

    seriesArea = (
      <path fill={color} opacity={focused ? 0.6 : 0.3} d={areaGen(grouped)} />
    );
  }

  return (
    <g>
      {focused && (
        <g opacity={0.2}>
          <DangerRange />
          <WarningRange
            highY={yTopScale(warningRangeTop.top)}
            lowY={yTopScale(warningRangeTop.low)}
          />
          <WarningRange
            highY={yBottomScale(warningRangeBottom.top)}
            lowY={yBottomScale(warningRangeBottom.low)}
          />
          <NormalRange
            highY={yTopScale(normalRangeTop.top)}
            lowY={yTopScale(normalRangeTop.low)}
          />
          <NormalRange
            highY={yBottomScale(normalRangeBottom.top)}
            lowY={yBottomScale(normalRangeBottom.low)}
          />
        </g>
      )}
      <SeriesLine color={color} d={topLine(topValues)} focused={focused} />
      {seriesArea}
      <SeriesLine
        color={color}
        d={bottomLine(bottomValues)}
        focused={focused}
      />
      {focused && (
        <g>
          {topValues
            .filter(valueWithin(domain))
            .map(({ time, value }, index) => (
              <ValueDot
                key={index}
                color={color}
                cx={timeScale(new Date(time))}
                cy={yTopScale(value)}
              />
            ))}
          {bottomValues
            .filter(valueWithin(domain))
            .map(({ time, value }, index) => (
              <ValueDot
                key={index}
                color={color}
                cx={timeScale(new Date(time))}
                cy={yBottomScale(value)}
              />
            ))}
        </g>
      )}
    </g>
  );
};

export default PairSeries;
