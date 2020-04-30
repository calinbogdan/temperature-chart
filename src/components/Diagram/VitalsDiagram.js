import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { select } from "d3-selection";
import { axisLeft } from "d3-axis";
import { scaleLinear } from "d3-scale";

const DiagramContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const AxisWrapper = styled.svg`
  .tick:last-of-type > text {
    transform: translateY(4px);
  }
  .tick:first-of-type > text {
    transform: translateY(-4px);
  }
`;

const Axis = ({ low, high, height }) => {
  const axisRef = useRef();

  useEffect(() => {
    select(axisRef.current).call(
      axisLeft(scaleLinear([low, high], [height - 2, 0]))
    );
  }, []);

  return (
    <AxisWrapper height={height - 1} width={40}>
      <g transform="translate(40 0)" ref={axisRef} />
    </AxisWrapper>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const AxesContainer = () => {
  return (
    <Container>
      <Axis height={300} high={40} low={35} />
    </Container>
  );
};

const SeriesContainer = () => (
  <svg>
    <rect height="100%" width="100%" />
  </svg>
);

const VitalsDiagram = (props) => {
  return (
    <DiagramContainer>
      <AxesContainer />
      <SeriesContainer />
    </DiagramContainer>
  );
};

export default VitalsDiagram;
