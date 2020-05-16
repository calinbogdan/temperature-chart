import React, { Children, useContext } from "react";
import styled from "styled-components";

import TimelineController from "../TimelineController";
import AxesContainer from "./AxesContainer";
import BufferContext from "../../bufferContext";

const DiagramContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const VitalsDiagram = (props) => {
  const { diagramWidth } = useContext(BufferContext);

  return (
    <DiagramContainer>
      <AxesContainer
        height={props.height}
        series={Children.map(props.children, (c) => c.props)}
      />
      <svg height={props.height} width={diagramWidth}>
        {props.children}
        <TimelineController height={props.height} width={diagramWidth} />
      </svg>
    </DiagramContainer>
  );
};
export default VitalsDiagram;
