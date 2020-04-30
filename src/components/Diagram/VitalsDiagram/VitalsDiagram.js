import React, { useRef, useEffect } from "react";
import styled from "styled-components";

import AxesContainer from "./AxesContainer";

const SeriesContainer = () => (
  <svg>
    <rect height="100%" width="100%" />
  </svg>
);

const DiagramContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const VitalsDiagram = (props) => {
  return (
    <DiagramContainer>
      <AxesContainer />
      {/* <SeriesContainer /> */}
    </DiagramContainer>
  );
};

export default VitalsDiagram;
