import React, { useEffect, useContext, useCallback, useRef } from "react";
import styled from "styled-components";

import BufferWidthContext from "../../contexts/bufferContext";
import HighlightContext, {
  HighlightProvider,
} from "../contexts/highlightContext";
import TimelineContext from "../../contexts/timelineContext";

import AxisContainer from "./AxisContainer";
import Series from "./Series";

import { AxisBottom } from "d3-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const withHighlightedLast = (series, highlightedId) => [
  ...series.filter(({ id }) => highlightedId !== id),
  ...series.filter(({ id }) => highlightedId === id),
];

const VitalsDiagram = ({ series }) => {
  const { diagramWidth, setSeriesNumber } = useContext(BufferWidthContext);
  const { drag, zoom, timeScale } = useContext(TimelineContext);
  const rectRef = useRef();

  useEffect(() => {
    setSeriesNumber(series.length);
  }, [series]);

  const onWheelListener = useCallback((e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      zoom(e.offsetX, e.deltaY < 0);
    }
  });

  const onMouseMoveListener = useCallback((e) => {
    if (e.buttons > 0) {
      drag(e.movementX);
    }
  });

  useEffect(() => {
    rectRef.current.addEventListener("mousewheel", onWheelListener, {
      passive: false,
    });
    rectRef.current.addEventListener("mousemove", onMouseMoveListener);

    return () => {
      rectRef.current.removeEventListener("mousewheel", onWheelListener);
      rectRef.current.removeEventListener("mousemove", onMouseMoveListener);
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
                  <AxisBottom scale={timeScale} tickSize={300} color="#eee"/>
                  <g>
                    {withHighlightedLast(series, highlightedId).map((data) => (
                      <Series key={data.id} id={data.id} data={data} />
                    ))}
                  </g>
                  <rect
                    ref={rectRef}
                    height={300}
                    width={diagramWidth}
                    fill="transparent"
                  />
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
