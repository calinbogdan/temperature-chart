import React, { useRef, useEffect, useContext } from "react";
import { select } from "d3-selection";
import { axisLeft } from "d3-axis";
import { scaleLinear } from "d3-scale";
import styled from "styled-components";
import BufferContext from "../../bufferContext";

const AxisWrapper = styled.svg`
  .tick:last-of-type > text {
    transform: translateY(3.5px);
  }
  .tick:first-of-type > text {
    transform: translateY(-3.5px);
  }
  .domain {
    stroke-width: 1.5px;
  }

  text {
    font: 12px monospace;
  }
`;

const AXIS_WIDTH = 40;
const Axis = ({ low, high, height, color }) => {
  const axisRef = useRef();

  useEffect(() => {
    select(axisRef.current).call(
      axisLeft(scaleLinear([low, high], [height - 2, 0])).tickSizeOuter(6).tickSizeInner(4).tickPadding(4)
    );
  }, []);

  return (
    <AxisWrapper height={height - 1} width={AXIS_WIDTH}>
      {/* <rect fill={color} height={height} width={AXIS_WIDTH} fillOpacity={0.2}/> */}
      <g color={color} transform={`translate(${AXIS_WIDTH - 1} 0)`} ref={axisRef} />
    </AxisWrapper>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const AxesContainer = ({ height, series }) => {
  const { setSeriesCount } = useContext(BufferContext);

  useEffect(() => { 
    setSeriesCount(series.length);
  }, [series.length]);
  return (
    <Container>
      {series.map((serieProps, index) => <Axis key={index} {...serieProps} />)}
    </Container>
  );
};

export default AxesContainer;
