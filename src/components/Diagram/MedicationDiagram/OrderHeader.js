import React from "react";
import styled from "styled-components";
import { orderHeight } from "./constants";
import { ContinousIcon, IntermittentIcon, PeroralIcon } from "./icons";

const OrderDetails = styled.div`
  margin: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & p {
    margin: 0px;
  }
`;

const Quantity = styled.p`
  font-size: 0.75em;
  color: #666;
`;

const Wrapper = styled.div`
  display: flex;
  height: ${orderHeight}px;
  align-items: center;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  padding: 8px;
`;

const OrderIcon = (props) => {
  switch (props.orderType) {
    case "continous":
      return <ContinousIcon />;
    case "intermittent":
      return <IntermittentIcon />;
    case "peroral":
      return <PeroralIcon size={20} />;
  }
};

const OrderHeader = (props) => (
  <svg width={props.width} height="100%">
    <rect height="100%" width="100%" fill="#eee" />
    <foreignObject height="100%" width="100%">
      <Wrapper>
        <OrderDetails>
          <p>{props.text}</p>
          <Quantity>{props.quantity}</Quantity>
        </OrderDetails>
        <IconWrapper>
          <OrderIcon orderType={props.type} />
        </IconWrapper>
      </Wrapper>
    </foreignObject>
  </svg>
);

export default OrderHeader;
