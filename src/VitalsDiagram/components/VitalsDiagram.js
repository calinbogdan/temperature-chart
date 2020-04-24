import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
  memo,
  useMemo,
  useRef,
} from "react";
import * as d3 from "d3";
import { scaleLinear, line, zoom, select } from "d3";
import styled from "styled-components";

import BufferWidthContext from "../../contexts/bufferContext";
import AxisContainer from "./AxisContainer";
import HighlightContext, {
  HighlightProvider,
} from "../contexts/highlightContext";
import TimelineContext from "../../contexts/timelineContext";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

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
    // only those that are within the rendered domain

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
      {highlightedId === data.id && (
        <g>
          {renderables.map((entry, index) => (
            <g key={index}>
              <Circle
                fill={data.color}
                cx={pointsX[index]}
                cy={pointsY[index]}
                value={entry.value}
              />
            </g>
          ))}
        </g>
      )}
    </g>
  );
};

const withHighlightedLast = (series, highlightedId) => [
  ...series.filter(({ id }) => highlightedId !== id),
  ...series.filter(({ id }) => highlightedId === id),
];

const VitalsDiagram = ({ series }) => {
  const { width, diagramWidth, setSeriesNumber } = useContext(
    BufferWidthContext
  );
  const { drag, zoom } = useContext(TimelineContext);

  useEffect(() => {
    setSeriesNumber(series.length);
  }, [series]);

  const onWheelListener = useCallback(e => {
    if (e.ctrlKey) {
      e.preventDefault();
      zoom(e.offsetX, e.deltaY < 0);
    }
  });

  const onMouseMoveListener = useCallback(e => {
    if (e.buttons > 0) {
      drag(e.movementX);
    }
  });

  useEffect(() => {
    window.addEventListener("mousewheel", onWheelListener, { passive: false });
    window.addEventListener("mousemove", onMouseMoveListener);

    return () => {
      window.removeEventListener("mousewheel", onWheelListener);
      window.removeEventListener("mousemove", onMouseMoveListener);
    };
  }, []);

  return (
    <Container>
      <HighlightProvider>
        <HighlightContext.Consumer>
          {({ highlightedId }) => {
            return (
              <React.Fragment>
                <AxisContainer series={series} />
                <svg width={diagramWidth} height={300}>
                  <g>
                    {withHighlightedLast(series, highlightedId).map((data) => (
                      <Series key={data.id} id={data.id} data={data} />
                    ))}
                  </g>
                </svg>
              </React.Fragment>
            );
          }}
        </HighlightContext.Consumer>
      </HighlightProvider>
    </Container>
  );
};

export default VitalsDiagram;
