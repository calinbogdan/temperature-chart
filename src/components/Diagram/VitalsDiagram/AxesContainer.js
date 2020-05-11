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
      axisLeft(scaleLinear([low, high], [height - 2, 0]))
        .tickSizeOuter(6)
        .tickSizeInner(4)
        .tickPadding(4)
    );
  }, []);

  return (
    <AxisWrapper height={height - 1} width={AXIS_WIDTH}>
      <g
        color={color}
        transform={`translate(${AXIS_WIDTH - 1} 0)`}
        ref={axisRef}
      />
    </AxisWrapper>
  );
};

const PairAxis = (props) => {
  const topAxisRef = useRef();
  const bottomAxisRef = useRef();

  const halfHeight = props.height - 2;

  useEffect(() => {
    select(topAxisRef.current).call(
      axisLeft(scaleLinear([props.topLow, props.topHigh], [halfHeight - 2, 0]))
        .tickSizeOuter(6)
        .tickSizeInner(4)
        .tickPadding(4)
    );
    select(bottomAxisRef.current).call(
      axisLeft(
        scaleLinear([props.bottomLow, props.bottomHigh], [halfHeight - 2, 0])
      )
        .tickSizeOuter(6)
        .tickSizeInner(4)
        .tickPadding(4)
    );
  }, []);

  return (
    <svg height={props.height - 1} width={AXIS_WIDTH}>
      <g ref={topAxisRef} />
      <g transform={`translate(0 ${(height - 1) / 2})`} ref={bottomAxisRef} />
    </svg>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  width: ${(props) => props.width}px;
  flex: 0 0 ${(props) => props.width}px;
`;

function axisComponentBySeriesType(type) {
  if (type === "paired") {
    return PairAxis;
  }
  return Axis;
}

const AxesContainer = ({ series }) => {
  const { bufferWidth } = useContext(BufferContext);
  return (
    <Container width={bufferWidth}>
      {series.map((serie, index) => {
        const AxisType = axisComponentBySeriesType(serie.type);
        return <AxisType key={index} {...serie} />;
      })}
    </Container>
  );
};

export default AxesContainer;
