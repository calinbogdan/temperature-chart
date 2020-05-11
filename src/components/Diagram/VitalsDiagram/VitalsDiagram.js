import React, {
  useRef,
  useCallback,
  Children,
  useContext,
  useEffect,
} from "react";
import styled from "styled-components";

import AxesContainer from "./AxesContainer";
import TimelineContext from "../../timelineContext";
import BufferContext from "../../bufferContext";

const DiagramContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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
export default VitalsDiagram;
