import React, { createContext, useState } from "react";

const BufferWidthContext = createContext(null);

const STANDARD_AXIS_WIDTH = 35;

const BufferWidthProvider = (props) => {
  const [bufferWidth, setBufferWidth] = useState(0);

  return (
    <BufferWidthContext.Provider
      value={{
        width: props.width,
        diagramWidth: props.width - bufferWidth,
        bufferWidth,
        setSeriesNumber: seriesCount => setBufferWidth(seriesCount * STANDARD_AXIS_WIDTH)
      }}
    >
      {props.children}
    </BufferWidthContext.Provider>
  );
};

export { BufferWidthProvider };
export default BufferWidthContext;
