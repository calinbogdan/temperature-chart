import React, { useRef, useEffect, Children, useContext } from "react";
import styled from "styled-components";
import { line } from "d3-shape";

import AxesContainer from "./AxesContainer";
import TimelineContext from "components/timelineContext";
import { scaleTime, scaleLinear } from "d3-scale";

const SeriesLine = styled.path`
  fill: none;
  stroke: ${(props) => props.color};
`;

const Series = ({ color, data, valueAccessor, dateAccessor, high, low, height }) => {
  const { domain } = useContext(TimelineContext);

  const xScale = scaleTime(domain, [0, 1000]);
  const yScale = scaleLinear([low, high], [height, 0]);
  const lineWith = line()
    .x((d) => xScale(new Date(dateAccessor(d))))
    .y(d => yScale(valueAccessor(d)));

  return (
    <g>
      <SeriesLine color={color} d={lineWith(data)} />
    </g>
  );
};

const DiagramContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const VitalsDiagram = (props) => {
  return (
    <DiagramContainer>
      <AxesContainer
        height={props.height}
        series={Children.map(props.children, (c) => c.props)}
      />
      <svg height={props.height} width={props.width - Children.count(props.children) * 40}>
        {props.children}
      </svg>
    </DiagramContainer>
  );
};

export { Series };
export default VitalsDiagram;
