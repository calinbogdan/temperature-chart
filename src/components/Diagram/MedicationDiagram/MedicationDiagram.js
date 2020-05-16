import React, { useContext } from "react";
import PropTypes from "prop-types";
import BufferContext from "../../bufferContext";
import styled from "styled-components";
import TimelineContext from "../../timelineContext";
import TimelineController from "../TimelineController";
import Peroral from "./Peroral";

const ORDER_HEIGHT = 50;
const ORDER_BAR_HEIGHT = 20;

const DiagramHeader = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: ${(props) => props.width};
`;
const DiagramContent = styled.div`
  display: inline-flex;
  flex-direction: column;
  border-top: 1px solid #999;
`;

const DiagramWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
`;

const MedicationOrderTitle = styled.p`
  margin: 0;
`;

const MedicationOrderWrapper = styled.svg`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;

  &:nth-of-type(2n) {
    background: #fcfcfc;
  }
`;

const MedicationOrderContent = styled.svg`
  display: inline-block;
`;

const MedicationOrderBackground = styled.rect`
  fill: #dbf1ff;
  stroke: #888;
  stroke-width: 0.25;
`;

const ContinousInfusion = (props) => {
  const { timeScale } = useContext(TimelineContext);

  const x = timeScale(props.interval[0]);
  const width = timeScale(props.interval[1]) - timeScale(props.interval[0]);

  return (
    <g>
      <MedicationOrderBackground
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
        stroke="#555"
        strokeDasharray="4 2 1 2 4 8"
      />
    </g>
  );
};

ContinousInfusion.propTypes = {
  interval: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
};

const IntermittentInfusion = (props) => {
  const { timeScale } = useContext(TimelineContext);

  const x = timeScale(props.interval[0]);
  const width = timeScale(props.interval[1]) - timeScale(props.interval[0]);

  return (
    <g>
      <MedicationOrderBackground
        height={ORDER_BAR_HEIGHT}
        y={ORDER_HEIGHT - ORDER_BAR_HEIGHT}
        x={x}
        width={width}
      />
      {administrationTimes(props.interval, props.minutesSpan).map(
        (date, index) => {
          return (
            <polygon
              key={index}
              transform={`translate(${timeScale(date)} 32)`}
              fill="#555"
              points="0,0 5,8 0,16 -5,8"
            />
          );
        }
      )}
    </g>
  );
};

IntermittentInfusion.propTypes = {
  interval: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  minutesSpan: PropTypes.number.isRequired,
};

function componentForOrderType(order) {
  switch (order.type) {
    case "continous":
      return <ContinousInfusion interval={order.interval} />;
    case "intermittent":
      return (
        <IntermittentInfusion
          interval={order.interval}
          minutesSpan={order.minutesSpan}
        />
      );
    case "peroral":
      return (
        <Peroral interval={order.interval} minutesSpan={order.minutesSpan} />
      );
  }
}
function administrationTimes(interval, span) {
  const unixStart = interval[0].getTime();
  const unixEnd = interval[1].getTime();
  const step = span * 60 * 1000;

  const dates = [];

  for (let i = unixStart; i <= unixEnd; i += step) {
    dates.push(new Date(i));
  }
  return dates;
}

const MedicationDiagram = ({ orders }) => {
  const { bufferWidth, diagramWidth } = useContext(BufferContext);

  return (
    <DiagramWrapper>
      {/* <DiagramHeader width={bufferWidth}>
        {orders.map((order, index) => (
        ))}
      </DiagramHeader> */}
      <DiagramContent>
        {orders.map((order, index) => {
          return (
            <MedicationOrderWrapper key={index}>
              <svg key={index} width={bufferWidth} height={50}>
                <rect height="100%" width="100%" fill="#eee" />
                <foreignObject height="100%" width="100%">
                  <MedicationOrderTitle>
                    {order.medication}
                  </MedicationOrderTitle>
                </foreignObject>
              </svg>
              <MedicationOrderContent
                height={ORDER_HEIGHT}
                width={diagramWidth}
              >
                {componentForOrderType(order)}
              </MedicationOrderContent>
            </MedicationOrderWrapper>
          );
        })}
        <TimelineController
          height={ORDER_HEIGHT * orders.length}
          width={diagramWidth}
        />
      </DiagramContent>
    </DiagramWrapper>
  );
};

export default MedicationDiagram;
