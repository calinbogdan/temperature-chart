import React from "react";
import { AxisLeft } from "d3-components";
import { scaleLinear } from "d3";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const AxisContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Diagram = styled.svg`
  background: lightcoral;
`;

export default function VitalsDiagram() {
  return (
    <Container>
      <AxisContainer>
        <AxisLeft nested scale={scaleLinear([0, 100], [0, 299])} />
      </AxisContainer>
      <Diagram width={1420} height={300}></Diagram>
    </Container>
  );
}
