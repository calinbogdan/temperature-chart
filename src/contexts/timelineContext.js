import React, {
  useState,
  createContext,
  useEffect,
  useReducer,
  useContext,
  useCallback,
} from "react";
import { scaleTime, scaleLinear, timeMillisecond } from "d3";
import BufferWidthContext from "./bufferContext";

const TimelineContext = createContext(null);

const ZOOM = "ZOOM";
const FULL_DOMAIN_CHANGE = "FULL_DOMAIN_CHANGE";
const DOMAIN_CHANGE = "DOMAIN_CHANGE";
const DRAG = "DRAG";
const SCALE_CHANGE = "SCALE_CHANGE";

const reducer = (state, action) => {
  switch (action.type) {
    case DOMAIN_CHANGE:
      return {
        ...state,
        domain: action.domain,
        scale: state.scale.domain(action.domain)
      };
    case FULL_DOMAIN_CHANGE:
      return {
        ...state,
        fullDomain: action.fullDomain,
        domain: action.fullDomain,
        scale: scaleTime(action.fullDomain, state.scale.range())
      };

    case SCALE_CHANGE:
      return {
        ...state,
        scale: scaleTime(action.domain, state.scale.range()),
      };

    case ZOOM:
      const { x, zoomingIn } = action;
      const currentTime = state.scale.invert(x);
      const diagramWidth = state.scale.range()[1];

      const leftPixelsInterval = x;
      const rightPixelsInterval = diagramWidth - x;

      const leftScale = scaleTime(
        [state.scale.domain()[0], currentTime],
        [0, x]
      );
      const rightScale = scaleTime(
        [currentTime, state.scale.domain()[1]],
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

      return {
        ...state,
        domain: [newStart, newEnd],
        scale: scaleTime([newStart, newEnd], state.scale.range())
      };
  }
};

const initialState = {
  domain: [new Date(), new Date()],
  fullDomain: [new Date(), new Date()],
};

function domainFitsWithinFull(domain, fullDomain) {
  const [start, end] = domain;
  const [fullStart, fullEnd] = fullDomain;
  return (
    start.getTime() >= fullStart.getTime() && end.getTime() <= fullEnd.getTime()
  );
}

const TimelineProvider = ({ children }) => {
  const { diagramWidth } = useContext(BufferWidthContext);
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    scale: scaleTime(initialState.fullDomain, [0, diagramWidth]),
    fullScale: scaleTime(initialState.fullDomain, [0, diagramWidth]),
  });

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
          const x1 = state.scale(state.domain[0]);
          const x2 = state.scale(state.domain[1]);

          const newStart = state.scale.invert(x1 - movementX);
          const newEnd = state.scale.invert(x2 - movementX);

          if (domainFitsWithinFull([newStart, newEnd], state.fullDomain)) {
            dispatch({
              type: DOMAIN_CHANGE,
              domain: [newStart, newEnd],
            });
          }
        },
        zoom: (x, zoomingIn) => {
          dispatch({
            type: ZOOM,
            x,
            zoomingIn
          });
        }
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
};

export { TimelineProvider };
export default TimelineContext;
