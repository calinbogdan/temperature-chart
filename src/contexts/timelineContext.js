import React, { useState, createContext, useEffect } from "react";
import { scaleTime } from "d3";

const TimelineContext = createContext(null);

const TimelineProvider = ({ children }) => {
  const [fullDomain, setFullDomain] = useState([new Date(), new Date()]);
  const [timeScale, setTimeScale] = useState(() =>
    scaleTime(fullDomain, [0, 0])
  );

  useEffect(() => {
    setTimeScale(() => scaleTime(fullDomain, [0, 1415]));
  }, [fullDomain]);

  return (
    <TimelineContext.Provider
      value={{
        fullDomain,
        timeScale,
        setFullDomain,
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
};

export { TimelineProvider };
export default TimelineContext;
