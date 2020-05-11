import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
} from "react";
import { scaleTime } from "d3-scale";
import BufferContext from "./bufferContext";

const TimelineContext = createContext(null);

const ZOOM = "ZOOM";
const FULL_DOMAIN_CHANGE = "FULL_DOMAIN_CHANGE";
const DRAG = "DRAG";
const SCALE_RANGE_CHANGED = "SCALE_RANGE_CHANGED";


function changeDomainAndScaleWithFullDomainLimit(scale, domain, fullDomain) {
  const fullInterval = fullDomain[1].getTime() - fullDomain[0].getTime();
  const interval = domain[1].getTime() - domain[0].getTime();

  const newDomain = fullInterval >= interval ? domain : fullDomain;
  return {
    scale: scaleTime(newDomain, scale.range()),
    domain: newDomain
  };
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

    case DRAG: {
      const { movementX } = action;
      const x1 = state.scale(state.domain[0]);
      const x2 = state.scale(state.domain[1]);

      const newStart = state.scale.invert(x1 - movementX);
      const newEnd = state.scale.invert(x2 - movementX);

      if (newStart.getTime() >= state.fullDomain[0].getTime() && newEnd.getTime() <= state.fullDomain[1].getTime()) {
        return {
          ...state, 
          scale: scaleTime([newStart, newEnd], state.scale.range()),
          domain: [newStart, newEnd]
        }
      }
      return state;
    }
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
      
      // prevent the user from zooming out more than the full domain

      const fullInterval = state.fullDomain[1].getTime() - state.fullDomain[0].getTime();
      const interval = newEnd.getTime() - newStart.getTime();

      if (interval <= fullInterval) {
        return {
          ...state,
          scale: scaleTime([newStart, newEnd], state.scale.range()),
          domain: [newStart, newEnd]
        };
      }
      return state;
  }
};

const TimelineProvider = ({ children, startDate, endDate }) => {
  const { diagramWidth } = useContext(BufferContext);
  const [state, dispatch] = useReducer(reducer, {
    fullDomain: [startDate, endDate],
    domain: [startDate, endDate],
    scale: scaleTime([startDate, endDate], [0, diagramWidth])
  });

  useEffect(() => {
    dispatch({
      type: SCALE_RANGE_CHANGED,
      width: diagramWidth
    })
  }, [diagramWidth]);

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



