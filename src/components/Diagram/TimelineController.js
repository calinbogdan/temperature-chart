import React, { useCallback, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import TimelineContext from "../timelineContext";

const TimelineController = (props) => {
  const rectRef = useRef();
  const { drag, zoom } = useContext(TimelineContext);

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
    <svg height={props.height} width={props.width}>
      <rect
        ref={rectRef}
        height="100%"
        width="100%"
        fill="transparent"
      />
    </svg>
  );
};

TimelineController.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default TimelineController;
