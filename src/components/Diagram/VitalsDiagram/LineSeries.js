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

const LineSeries = ({ color, values, high, low, height, focused }) => {
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
