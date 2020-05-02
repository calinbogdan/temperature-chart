import React, { useContext } from "react";
import BufferContext from "../../bufferContext";
import styled from "styled-components";

const orders = [
  {
    medication: "Paracetamol",
  },
  {
    medication: "ParaSinus",
  },
];

const MedicationOrderHeader = styled.div`
  display: block;
  max-width: ${(props) => props.width}px;
  padding: 8px 12px;
  background: #ddd;
  box-sizing: border-box;
`;

const MedicationOrderTitle = styled.p`
  margin: 0;
`;

const MedicationDiagram = () => {
  const { bufferWidth } = useContext(BufferContext);

  return (
    <div>
      {orders.map((order, index) => {
        return (
          <div key={index}>
            <MedicationOrderHeader width={bufferWidth}>
              <MedicationOrderTitle>{order.medication}</MedicationOrderTitle>
            </MedicationOrderHeader>
          </div>
        );
      })}
    </div>
  );
};

export default MedicationDiagram;
