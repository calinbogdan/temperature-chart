import React from "react";
import styled from "styled-components";

const MedicationOrderTitle = styled.p`
  margin: 0;
`;

const OrderHeader = (props) => (
  <svg width={props.width} height="100%">
    <rect height="100%" width="100%" fill="#eee" />
    <foreignObject height="100%" width="100%">
      <MedicationOrderTitle>{props.text}</MedicationOrderTitle>
    </foreignObject>
  </svg>
);

export default OrderHeader;
