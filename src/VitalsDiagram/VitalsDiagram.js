import React from "react";
import { AxisLeft } from "d3-components";
import { scaleLinear, line } from "d3";
import styled from "styled-components";
import temperatures from "../assets/temperatures.json";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const AxisContainer = styled.div`
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

const Diagram = styled.svg`
  background: lightcoral;
`;

const Line = styled.path`
  fill: none;
  stroke: black;
`;

const tempScale = scaleLinear([42, 35], [0, 299]);

const Series = () => {
  const lineAs = line()
    .y((d) => tempScale(d))
    .x((_, i) => i * 5);

  return (
    <g>
      <Line d={lineAs(temperatures.slice(0, 300))} />
    </g>
  );
};

export default function VitalsDiagram(props) {
  return (
    <Container {...props}>
      <AxisContainer>
        <svg overflow="visible" height={299} width={35}>
          <AxisLeft nested scale={tempScale} />
          <ClickableRectangle height={299} width={35} />
        </svg>
      </AxisContainer>
      <Diagram width={1415} height={300}>
        <Series />
      </Diagram>
    </Container>
  );
}
