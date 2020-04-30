import React, { useRef, useEffect } from "react";
import { select } from "d3-selection";
import { axisLeft } from "d3-axis";
import { scaleLinear } from "d3-scale";
import styled from "styled-components";

const AxisWrapper = styled.svg`
  .tick:last-of-type > text {
    transform: translateY(3px);
  }
  .tick:first-of-type > text {
    transform: translateY(-3px);
  }
`;

const AXIS_WIDTH = 40;
const Axis = ({ low, high, height }) => {
  const axisRef = useRef();

  useEffect(() => {
    select(axisRef.current).call(
      axisLeft(scaleLinear([low, high], [height - 2, 0]))
    );
  }, []);

  return (
    <AxisWrapper height={height - 1} width={AXIS_WIDTH}>
      <g transform={`translate(${AXIS_WIDTH - 1} 0)`} ref={axisRef} />
    </AxisWrapper>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const AxesContainer = ({ height, series }) => {
  return (
    <Container>
      {series.map((serie, index) => <Axis key={index} height={height} high={serie.high} low={serie.low} />)}
    </Container>
  );
};

export default AxesContainer;
