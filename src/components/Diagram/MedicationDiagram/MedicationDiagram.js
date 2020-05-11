import React, { useContext } from "react";
import PropTypes from "prop-types";
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

const ContinousInfusion = (props) => {
  const { timeScale } = useContext(TimelineContext);

  const x = timeScale(props.interval[0]);
  const width = timeScale(props.interval[1]) - timeScale(props.interval[0]);

  return (
    <g>
      <MedicationContinousInfusion
        height={ORDER_BAR_HEIGHT}
        y={ORDER_HEIGHT - ORDER_BAR_HEIGHT}
        x={x}
        width={width}
      />
      <line
        x1={x}
        x2={x + width}
        y1={ORDER_HEIGHT - ORDER_BAR_HEIGHT / 2}
        y2={ORDER_HEIGHT - ORDER_BAR_HEIGHT / 2}
        stroke="#999"
        strokeDasharray="4 2 1 2 4 8"
      />
    </g>
  );
};

ContinousInfusion.propTypes = {
  interval: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
};

const IntermittentInfusion = (props) => (
  <g>
    <polygon points="" />
  </g>
);

function componentForOrderType(order) {
  switch (order.type) {
    case "continous":
      return ContinousInfusion;
    case "intermittent":
      return IntermittentInfusion;
  }
}

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
              <ContinousInfusion interval={order.interval} />
            </MedicationOrderContent>
          </MedicationOrderWrapper>
        );
      })}
    </DiagramWrapper>
  );
};

export default MedicationDiagram;
