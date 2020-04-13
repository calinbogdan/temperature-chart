import React, { useState, useEffect, useContext, useCallback } from "react";
import { AxisLeft } from "d3-components";
import styled from "styled-components";
import { scaleLinear } from "d3";

import HighlightContext from "../contexts/highlightContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const ClickableRectangle = styled.rect`
  fill: ${props => props.highlighted ? props.color : "transparent"};
  fill-opacity: 0.2;
  z-index: -15;
  &:hover {
    cursor: pointer;
    fill: ${props => props.color};
  }
`;

const Axis = ({ data: { id, max, min, height, color } }) => {
  const [scale, setScale] = useState(() => scaleLinear([0, 0], [0, 0]));
  const { highlightedId, highlight } = useContext(HighlightContext);

  useEffect(() => {
    setScale(() => scaleLinear([max, min], [0, height]));
  }, [height, min, max]);

  const clickListener = useCallback(() => {
    highlight(id);
  }, [id, highlight]);

  return (
    <svg overflow="visible" height={height} width={35}>
      <AxisLeft nested scale={scale} />
      <ClickableRectangle
        height={height}
        width={35}
        color={color}
        highlighted={highlightedId === id}
        onClick={clickListener}
      />
    </svg>
  );
};

const AxisContainer = ({ series }) => {
  return (
    <Wrapper>
      {series.map((data) => (
        <Axis key={data.id} data={data} />
      ))}
    </Wrapper>
  );
};

export default AxisContainer;
