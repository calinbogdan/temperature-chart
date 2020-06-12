import React, { useContext, useCallback } from "react";
import styled from "styled-components";

import { line } from "d3-shape";
import { scaleLinear } from "d3-scale";

import TimelineContext from "../../timelineContext";
import valueWithin from "./valueWithinFilter";
import { DangerRange, WarningRange, NormalRange } from "./ranges";
import ValueDot from "./ValueDot";
import domainIsLessThanThreeDays from "./domainIsLessThanThreeDays";

const SeriesLine = styled.path`
  fill: none;
  opacity: ${(props) => (props.focused ? 1 : 0.5)};
  stroke: ${(props) => props.color};
  stroke-width: ${(props) => (props.focused ? 2 : 1)};
`;

const LineSeries = ({
  color,
  values,
  high,
  low,
  height,
  focused,
  normalRange,
  warningRange,
}) => {
  const { domain, timeScale } = useContext(TimelineContext);

  const yScale = useCallback(scaleLinear([low, high], [height, 0]), [
    low,
    high,
    height,
  ]);

  const lineWith = line()
    .x((d) => timeScale(new Date(d.time)))
    .y((d) => yScale(d.value));

  return (
    <g>
      {focused && (
        <g opacity={0.2}>
          <DangerRange />
          <WarningRange
            highY={yScale(warningRange.high)}
            lowY={yScale(warningRange.low)}
          />
          <NormalRange
            highY={yScale(normalRange.high)}
            lowY={yScale(normalRange.low)}
          />
        </g>
      )}
      <SeriesLine color={color} focused={focused} d={lineWith(values)} />
      {focused && domainIsLessThanThreeDays(domain) && (
        <g>
          {values.filter(valueWithin(domain)).map(({ time, value }, index) => (
            <ValueDot
              key={index}
              color={color}
              cx={timeScale(new Date(time))}
              cy={yScale(value)}
            />
          ))}
        </g>
      )}
    </g>
  );
};


export default LineSeries;
