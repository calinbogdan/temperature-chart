import React, { useEffect, useContext, useState, memo, useMemo } from 'react';
import styled from "styled-components";
import { scaleLinear, line } from "d3";

import HighlightContext from "../contexts/highlightContext";
import TimelineContext from "../../contexts/timelineContext";


const Line = styled.path`
  fill: none;
  stroke: ${(props) => props.color};
  stroke-width: ${(props) => (props.highlighted ? 2 : 0.5)};
`;

const PointValue = styled.text`
  transform: translate(-5px, -5px);
  font-family: monospace;
  font-size: 12px;
`;

const Circle = memo(({ cx, cy, fill, value }) => {
  return (
    <g>
      <circle r={3} cx={cx} cy={cy} fill={fill} />
      <PointValue x={cx} y={cy}>
        {value.toFixed(1)}
      </PointValue>
    </g>
  );
});


const Series = ({ id, data }) => {
  const { highlightedId } = useContext(HighlightContext);
  const { timeScale } = useContext(TimelineContext);
  const [scale, setScale] = useState(() =>
    scaleLinear([data.max, data.min], [0, data.height])
  );

  useEffect(() => {
    setScale(() => scaleLinear([data.max, data.min], [0, data.height]));
  }, [data]);

  const pointsY = useMemo(
    () => data.values.map((entry) => scale(entry.value)),
    [data.values, scale]
  );
  const pointsX = useMemo(
    () => data.values.map((entry) => timeScale(entry.time)),
    [data.values, timeScale]
  );

  const renderables = data.values.filter((_, index) => {
    const pointTime = timeScale.invert(pointsX[index]);
    return (
      timeScale.domain()[0].getTime() <= pointTime.getTime() &&
      timeScale.domain()[1].getTime() >= pointTime.getTime()
    );
  });

  const lineAs = line()
    .y((_, i) => pointsY[i])
    .x((_, i) => pointsX[i]);

  return (
    <g id={id}>
      <Line
        highlighted={highlightedId === data.id}
        color={data.color}
        d={lineAs(data.values)}
      />
      {highlightedId === data.id && timeScale.domain()[1].getTime() - timeScale.domain()[0].getTime() && (
        <g>
          {renderables.map((entry, index) => (
            <g key={index}>
              <Circle
                fill={data.color}
                cx={timeScale(entry.time)}
                cy={scale(entry.value)}
                value={entry.value}
              />
            </g>
          ))}
        </g>
      )}
    </g>
  );
};

export default Series;