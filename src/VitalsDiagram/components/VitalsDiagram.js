import React, { useEffect, useContext } from "react";
import { scaleLinear, line } from "d3";
import styled from "styled-components";


import configs from "../../assets/seriesConfigs.json";
import values from "../../assets/seriesValues.json";

import BufferWidthContext from "../../contexts/bufferContext";
import AxisContainer from "./AxisContainer";

const Container = styled.div`
  display: flex;
  flex-direction: row;
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
    .x((_, i) => i * 3);

  return (
    <g>
      <Line d={lineAs(values[0].values.slice(0, 800))} />
    </g>
  );
};

const VitalsDiagram = (props) => {
  const { setSeriesNumber } = useContext(BufferWidthContext);

  useEffect(() => {
    setSeriesNumber(configs.length);
  }, []);

  return (
    <Container {...props}>
      <AxisContainer series={configs}/>
      <Diagram width={1415} height={300}>
        <Series />
      </Diagram>
    </Container>
  );
}

export default VitalsDiagram;
