import React, {
  useRef,
  useCallback,
  Children,
  useContext,
  useEffect,
} from "react";
import styled from "styled-components";
import { line } from "d3-shape";

import AxesContainer from "./AxesContainer";
import TimelineContext from "../../timelineContext";
import { scaleTime, scaleLinear } from "d3-scale";
import BufferContext from "../../bufferContext";

const SeriesLine = styled.path`
  fill: none;
  stroke: ${(props) => props.color};
`;

const Series = ({
  color,
  data,
  valueAccessor,
  dateAccessor,
  high,
  low,
  height,
}) => {
  const { domain } = useContext(TimelineContext);
  const { bufferWidth, width } = useContext(BufferContext);

  const xScale = scaleTime(domain, [0, width - bufferWidth]);
  const yScale = scaleLinear([low, high], [height, 0]);
  const lineWith = line()
    .x((d) => xScale(new Date(dateAccessor(d))))
    .y((d) => yScale(valueAccessor(d)));

  return (
    <g>
      <SeriesLine color={color} d={lineWith(data)} />
    </g>
  );
};

const DiagramContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const VitalsDiagram = (props) => {
  const { diagramWidth } = useContext(BufferContext);
  const { drag, zoom, timeScale } = useContext(TimelineContext);
  const rectRef = useRef();

  const onWheelListener = useCallback((e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      zoom(e.offsetX, e.deltaY < 0);
    }
  });

  console.log(timeScale.range());

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
    <DiagramContainer>
      <AxesContainer
        height={props.height}
        series={Children.map(props.children, (c) => c.props)}
      />
      <svg height={props.height} width={diagramWidth}>
        {props.children}
        <rect
          ref={rectRef}
          height={props.height}
          width={diagramWidth}
          fill="transparent"
        />
      </svg>
    </DiagramContainer>
  );
};

export { Series };
export default VitalsDiagram;
