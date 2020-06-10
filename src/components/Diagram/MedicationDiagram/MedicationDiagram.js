import React, { useContext } from "react";
import PropTypes from "prop-types";
import BufferContext from "../../bufferContext";
import styled from "styled-components";
import TimelineContext from "../../timelineContext";
import TimelineController from "../TimelineController";
import Peroral from "./Peroral";

const ORDER_HEIGHT = 50;
const ORDER_BAR_HEIGHT = 20;

const ControllerLayer = styled.div`
  position: absolute;
  z-index: 2;
  transform: translateX(${props => props.offsetX}px);
`;

const DiagramContent = styled.div`
  display: block;
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
  const interval = [new Date(order.interval[0]), new Date(order.interval[1])]
  switch (order.type) {
    case "continous":
      return <ContinousInfusion interval={interval} />;
    case "intermittent":
      return (
        <IntermittentInfusion
          interval={interval}
          minutesSpan={order.minutesSpan}
        />
      );
    case "peroral":
      return (
        <Peroral interval={interval} minutesSpan={order.minutesSpan} />
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

const MedicationOrderHeader = (props) => (
  <svg width={props.width} height={props.height}>
    <rect height="100%" width="100%" fill="#eee" />
    <foreignObject height="100%" width="100%">
      <MedicationOrderTitle>{props.text}</MedicationOrderTitle>
    </foreignObject>
  </svg>
);

const MedicationDiagram = ({ data }) => {
  const { bufferWidth, diagramWidth, width } = useContext(BufferContext);

  return (
    <DiagramWrapper>
      <DiagramContent>
        <div style={{
          position: "absolute"
        }}>
          {data.map((order, index) => {
            return (
              <MedicationOrderWrapper
                height={ORDER_HEIGHT}
                width={width}
                key={index}
              >
                <svg
                  height={ORDER_HEIGHT}
                  width={diagramWidth}
                  transform={`translate(${bufferWidth} 0)`}
                  overflow="visible"
                >
                  {componentForOrderType(order)}
                </svg>
                <MedicationOrderHeader width={bufferWidth} height={ORDER_HEIGHT} text={order.medication} />
              </MedicationOrderWrapper>
            );
          })}
        </div>
        <ControllerLayer offsetX={bufferWidth}>
          <TimelineController
            height={ORDER_HEIGHT * data.length}
            width={diagramWidth}
          />
        </ControllerLayer>
      </DiagramContent>
    </DiagramWrapper>
  );
};

MedicationDiagram.defaultProps = {
  data: []
};

export default MedicationDiagram;
