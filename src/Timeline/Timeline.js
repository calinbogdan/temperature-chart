import React from "react";
import styled from "styled-components";

const TimelineWrapper = styled.svg`
  background: lightgray;
`;

export default function Timeline() {
  return (
    <TimelineWrapper
      width={1450}
      height={40}
    ></TimelineWrapper>
  );
}
