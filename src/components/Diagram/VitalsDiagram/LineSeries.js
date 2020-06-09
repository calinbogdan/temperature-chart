import React, { useContext, useCallback } from "react";
import styled from "styled-components";

import { line } from "d3-shape";
import { scaleLinear } from "d3-scale";

import TimelineContext from "../../timelineContext";

const SeriesLine = styled.path`
  fill: none;
  opacity: ${(props) => (props.focused ? 1 : 0.5)};
  stroke: ${(props) => props.color};
  stroke-width: ${(props) => (props.focused ? 2 : 1)};
`;

const Range = ({ lowY, highY, fill }) => {
  const y = highY;
  const height = lowY - highY;
  return <rect width="100%" fill={fill} y={y} height={height} />;
};

const DangerRange = () => <rect fill="#ff0000" height="100%" width="100%"/>

const WarningRange = ({ highY, lowY }) => (
  <Range fill="#fff200" highY={highY} lowY={lowY} />
);
const NormalRange = ({ highY, lowY }) => (
  <Range fill="#0be000" highY={highY} lowY={lowY} />
);

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
  const { timeScale } = useContext(TimelineContext);

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
      {focused &&
        values.map(({ time, value }, index) => (
          <circle
            key={index}
            r={3}
            stroke={color}
            fill="white"
            cx={timeScale(new Date(time))}
            cy={yScale(value)}
          />
        ))}
    </g>
  );
};

export default LineSeries;
