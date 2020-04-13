import React, { useState, useEffect, useContext, createContext } from "react";
import { scaleLinear, line } from "d3";
import styled from "styled-components";

import series from "../../assets/series.json";

import BufferWidthContext from "../../contexts/bufferContext";
import AxisContainer from "./AxisContainer";
import { HighlightProvider } from "../contexts/highlightContext";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Line = styled.path`
  fill: none;
  stroke: ${(props) => props.color};
`;

const tempScale = scaleLinear([42, 35], [0, 299]);

const Series = ({ data }) => {
  const lineAs = line()
    .y((d) => tempScale(d))
    .x((_, i) => i * 3);

  return (
    <g>
      <Line color={data.color} d={lineAs(data.values.slice(0, 800))} />
    </g>
  );
};

const VitalsDiagram = (props) => {
  const { setSeriesNumber } = useContext(BufferWidthContext);

  useEffect(() => {
    setSeriesNumber(series.length);
  }, []);

  return (
    <Container {...props}>
      <HighlightProvider>
        <AxisContainer series={series} />
        <svg width={1415} height={300}>
          {series.map((data) => (
            <Series key={data.id} data={data} />
          ))}
        </svg>
      </HighlightProvider>
    </Container>
  );
};

export default VitalsDiagram;
