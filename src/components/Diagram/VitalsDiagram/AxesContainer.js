import React, { useRef, useEffect, useContext, useCallback } from "react";
import { select } from "d3-selection";
import { axisLeft } from "d3-axis";
import { scaleLinear } from "d3-scale";
import styled from "styled-components";
import BufferContext from "../../bufferContext";
import SeriesFocusContext from "./seriesFocusContext";

const AXIS_WIDTH = 40;

const AxisWrapper = styled.g`
  .tick:last-of-type > text {
    transform: translateY(4px);
  }
  .tick:first-of-type > text {
    transform: translateY(-4px);
  }
  .domain {
    stroke-width: 1.5px;
  }

  text {
    font-size: 1.25em;
  }
`;

const InteractiveRectangle = styled.rect`
  &:hover {
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
  }
`;

const LineAxis = ({ low, high, height, color, onClick, focused, disabled }) => {
  const axisRef = useRef();

  useEffect(() => {
    select(axisRef.current).call(
      axisLeft(scaleLinear([low, high], [height - 2, 0]))
        .tickSizeOuter(6)
        .tickSizeInner(4)
        .tickPadding(4)
        .ticks(5)
    );
  }, [low, high, height]);

  return (
    <svg height={height - 1} width={AXIS_WIDTH}>
      <rect
        height="100%"
        width="100%"
        opacity={0.2}
        fill={focused ? color : "transparent"}
      />
      <AxisWrapper>
        <g
          color={disabled ? "#aaa" : color}
          transform={`translate(${AXIS_WIDTH - 1} 0)`}
          ref={axisRef}
        />
      </AxisWrapper>
      <InteractiveRectangle
        height="100%"
        width="100%"
        fill="transparent"
        disabled={disabled}
        onClick={disabled ? null : onClick}
      />
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

const Axis = ({ serie, height, focused, disabled, onClick }) => {
  if (serie.type === "paired") {
    return (
      <LineAxis
        height={height}
        color={serie.color}
        low={serie.bottomLow}
        high={serie.topHigh}
        focused={focused}
        disabled={disabled}
        onClick={onClick}
      />
    );
  }
  return (
    <LineAxis
      height={height}
      color={serie.color}
      low={serie.low}
      high={serie.high}
      focused={focused}
      disabled={disabled}
      onClick={onClick}
    />
  );
};

const AxesContainer = ({ series, height, disabledMap }) => {
  const { bufferWidth } = useContext(BufferContext);
  const { focusedSeriesId, setFocusId } = useContext(SeriesFocusContext);
  return (
    <Container width={bufferWidth}>
      {series.map((serie, index) => (
        <Axis
          key={index}
          serie={serie}
          height={height}
          focused={focusedSeriesId === serie.id}
          disabled={disabledMap[serie.id]}
          onClick={() => setFocusId(serie.id)}
        />
      ))}
    </Container>
  );
};

export default AxesContainer;
