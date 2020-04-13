import React, { useState, createContext } from "react";

const HighlightContext = createContext(null);

const HighlightProvider = ({ children }) => {
  const [highlightedId, setHighlightedId] = useState(null);

  return (
    <HighlightContext.Provider
      value={{
        highlightedId,
        highlight: (id) => {
          if (highlightedId === id) {
            setHighlightedId(null);
          } else {
            setHighlightedId(id);
          }
        },
      }}
    >
      {children}
    </HighlightContext.Provider>
  );
};

export { HighlightProvider };
export default HighlightContext;