import React, { useContext } from "react";
import BufferContext from "../../bufferContext";
import styled from "styled-components";
import TimelineContext from "../../timelineContext";

const ORDER_HEIGHT = 50;
const ORDER_BAR_HEIGHT = 20;

const MedicationOrderHeader = styled.div`
  display: inline-block;
  width: ${(props) => props.width}px;
  flex: 0 0 ${(props) => props.width}px;
  padding: 8px 12px;
  background: #ddd;
  box-sizing: border-box;
  height: 50px;
`;

const MedicationOrderTitle = styled.p`
  margin: 0;
`;

const MedicationOrderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  border: 1px solid #999;
  border-top: 0px;
`;

const MedicationOrderContent = styled.svg`
  display: inline-block;
`;

const MedicationContinousInfusion = styled.rect`
  fill: #dbf1ff;
  stroke: #888;
  stroke-width: 0.25;
`;

const DiagramWrapper = styled.div`
  border-top: 1px solid #999;
`;

// DATA
const medOrder = {
  start: new Date("16 Feb 2020 17:00"),
  end: new Date("17 Feb 2020 05:00"),
};

const ContinousInfusion = (props) => (
  <g>
    <MedicationContinousInfusion
      height={ORDER_BAR_HEIGHT}
      y={ORDER_HEIGHT - ORDER_BAR_HEIGHT}
      x={props.x}
      width={props.width}
    />
    <line
      x1={props.x}
      x2={props.x + props.width}
      y1={ORDER_HEIGHT - ORDER_BAR_HEIGHT / 2}
      y2={ORDER_HEIGHT - ORDER_BAR_HEIGHT / 2}
      stroke="#999"
      strokeDasharray="4 2 1 2 4 8"
    />
  </g>
);

const MedicationDiagram = ({ orders }) => {
  const { bufferWidth, diagramWidth } = useContext(BufferContext);
  const { timeScale } = useContext(TimelineContext);

  return (
    <DiagramWrapper>
      {orders.map((order, index) => {
        return (
          <MedicationOrderWrapper key={index}>
            <MedicationOrderHeader width={bufferWidth}>
              <MedicationOrderTitle>{order.medication}</MedicationOrderTitle>
            </MedicationOrderHeader>
            <MedicationOrderContent height={ORDER_HEIGHT} width={diagramWidth}>
              <ContinousInfusion x={timeScale(medOrder.start)} width={timeScale(medOrder.end) - timeScale(medOrder.start)}/>
            </MedicationOrderContent>
          </MedicationOrderWrapper>
        );
      })}
    </DiagramWrapper>
  );
};

export default MedicationDiagram;
