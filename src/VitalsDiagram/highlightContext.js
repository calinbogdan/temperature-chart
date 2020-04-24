const HighlightContext = createContext(null);

const HighlightProvider = ({ children }) => {
  const [highlightedId, setHighlightedId] = useState(null);

  return (
    <HighlightContext.Provider
      value={{
        highlightedId,
        highlight: (id) => {
          if (highlightedId === null) {
            setHighlightedId(id);
          } else {
            setHighlightedId(null);
          }
        },
      }}
    >
      {children}
    </HighlightContext.Provider>
  );
};