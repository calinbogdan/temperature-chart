import React from "react";
import { AxisLeft } from "d3-components";
import styled from "styled-components";
import { scaleLinear } from "d3";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const ClickableRectangle = styled.rect`
  fill: transparent;
  fill-opacity: 0.15;
  z-index: -15;
  &:hover {
    cursor: pointer;
    fill: red;
  }
`;

const tempScale = scaleLinear([42, 35], [0, 299]);

const AxisContainer = ({ series }) => {
  return (
    <Wrapper>
      {series.map(({ id, max, min, height }) => {
        return (
          <svg key={id} overflow="visible" height={height - 1} width={35}>
            <AxisLeft nested scale={scaleLinear([max, min], [0, 299])} />
            <ClickableRectangle height={299} width={35} />
          </svg>
        );
      })}
    </Wrapper>
  );
};

export default AxisContainer;
