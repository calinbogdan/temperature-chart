import React, { createContext, useReducer, useContext, useEffect } from "react";
import { scaleTime } from "d3-scale";
import BufferContext from "./bufferContext";

const TimelineContext = createContext(null);

const ZOOM = "ZOOM";
const FULL_DOMAIN_CHANGE = "FULL_DOMAIN_CHANGE";
const DRAG = "DRAG";
const SCALE_RANGE_CHANGED = "SCALE_RANGE_CHANGED";

function drag(currentState, action) {
  const { movementX } = action;
  const { scale, domain, fullDomain } = currentState;
  const x1 = scale(domain[0]);
  const x2 = scale(domain[1]);

  const newStart = scale.invert(x1 - movementX);
  const newEnd = scale.invert(x2 - movementX);

  if (
    newStart.getTime() >= fullDomain[0].getTime() &&
    newEnd.getTime() <= fullDomain[1].getTime()
  ) {
    return {
      ...currentState,
      scale: scaleTime([newStart, newEnd], scale.range()),
      domain: [newStart, newEnd],
    };
  }
  return currentState;
}

function zoom(currentState, action) {
  const { x, zoomingIn } = action;
  const { scale, fullDomain } = currentState;
  const currentTime = scale.invert(x);
  const diagramWidth = scale.range()[1];

  const leftPixelsInterval = x;
  const rightPixelsInterval = diagramWidth - x;

  const leftScale = scaleTime([scale.domain()[0], currentTime], [0, x]);
  const rightScale = scaleTime(
    [currentTime, scale.domain()[1]],
    [x, diagramWidth]
  );

  let newStart, newEnd;
  if (zoomingIn) {
    newStart = leftScale.invert(leftPixelsInterval * 0.1);
    newEnd = rightScale.invert(diagramWidth - rightPixelsInterval * 0.1);
  } else {
    newStart = leftScale.invert(0 - leftPixelsInterval * 0.1);
    newEnd = rightScale.invert(diagramWidth + rightPixelsInterval * 0.1);
  }

  // TODO prevent the timeline from zooming out ouside the domain

  const fullInterval =
    fullDomain[1].getTime() - fullDomain[0].getTime();
  const interval = newEnd.getTime() - newStart.getTime();

  if (interval <= fullInterval) {
    return {
      ...currentState,
      scale: scaleTime([newStart, newEnd], scale.range()),
      domain: [newStart, newEnd],
    };
  }
  return currentState;
}

const reducer = (state, action) => {
  switch (action.type) {
    case FULL_DOMAIN_CHANGE:
      return {
        ...state,
        fullDomain: action.fullDomain,
        domain: action.fullDomain,
        scale: scaleTime(action.fullDomain, state.scale.range()),
      };

    case SCALE_RANGE_CHANGED:
      return {
        ...state,
        scale: scaleTime(state.scale.domain(), [0, action.width]),
      };

    case DRAG:
      return drag(state, action);
    case ZOOM:
      return zoom(state, action);
    default:
      return state;
  }
};

const TimelineProvider = ({ children, startDate, endDate }) => {
  const { diagramWidth } = useContext(BufferContext);
  const [state, dispatch] = useReducer(reducer, {
    fullDomain: [startDate, endDate],
    domain: [startDate, endDate],
    scale: scaleTime([startDate, endDate], [0, diagramWidth]),
  });

  useEffect(() => {
    dispatch({
      type: SCALE_RANGE_CHANGED,
      width: diagramWidth,
    });
  }, [diagramWidth]);

  useEffect(() => {
    dispatch({
      type: FULL_DOMAIN_CHANGE,
      fullDomain: [startDate, endDate],
    });
  }, [startDate, endDate]);

  return (
    <TimelineContext.Provider
      value={{
        domain: state.domain,
        fullDomain: state.fullDomain,
        timeScale: state.scale,
        setFullDomain: (domain) => {
          dispatch({
            type: FULL_DOMAIN_CHANGE,
            fullDomain: domain,
          });
        },
        drag: (movementX) => {
          dispatch({
            type: DRAG,
            movementX,
          });
        },
        zoom: (x, zoomingIn) => {
          dispatch({
            type: ZOOM,
            x,
            zoomingIn,
          });
        },
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
};

export { TimelineProvider };
export default TimelineContext;
