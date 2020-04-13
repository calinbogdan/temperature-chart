import React, { createContext, useState } from "react";

const BufferWidthContext = createContext(null);

const BufferWidthProvider = ({ children }) => {
  const [width, setWidth] = useState(0);

  return (
    <BufferWidthContext.Provider
      value={{
        width,
        setSeriesNumber: seriesCount => setWidth(seriesCount * 35)
      }}
    >
      {children}
    </BufferWidthContext.Provider>
  );
};

export { BufferWidthProvider };
export default BufferWidthContext;
