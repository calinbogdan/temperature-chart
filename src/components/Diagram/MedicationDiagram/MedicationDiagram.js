import React, { useContext } from "react";
import styled from "styled-components";
import BufferContext from "../../bufferContext";
import TimelineController from "../TimelineController";
import { orderHeight } from "./constants";
import OrderContent from "./OrderContent";
import OrderHeader from "./OrderHeader";

const ControllerLayer = styled.div`
  position: absolute;
  z-index: 2;
  transform: translateX(${(props) => props.offsetX}px);
`;

const ContentLayer = styled.div`
  position: absolute;
`;

const DiagramContent = styled.div`
  display: block;
  border-top: 1px solid #999;
`;

const DiagramWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
`;

const OrderWrapper = styled.svg`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;

  &:nth-of-type(2n) {
    background: #fcfcfc;
  }
`;

const MedicationDiagram = ({ data }) => {
  const { bufferWidth, diagramWidth, width } = useContext(BufferContext);

  return (
    <DiagramWrapper>
      <DiagramContent>
        <ContentLayer>
          {data.map((order, index) => {
            return (
              <OrderWrapper key={index} height={orderHeight} width={width}>
                <OrderHeader width={bufferWidth} text={order.medication} quantity={order.quantity} type={order.type}/>
                <svg height={orderHeight} width={diagramWidth} x={bufferWidth}>
                  <OrderContent data={order} />
                </svg>
              </OrderWrapper>
            );
          })}
        </ContentLayer>
        <ControllerLayer offsetX={bufferWidth}>
          <TimelineController
            height={orderHeight * data.length}
            width={diagramWidth}
          />
        </ControllerLayer>
      </DiagramContent>
    </DiagramWrapper>
  );
};

MedicationDiagram.defaultProps = {
  data: [],
};

export default MedicationDiagram;
