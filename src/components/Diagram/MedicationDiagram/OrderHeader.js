import React from "react";
import styled from "styled-components";
import { orderHeight } from "./constants";
import { ContinousIcon, IntermittentIcon, PeroralIcon } from "./icons";

const OrderTitle = styled.p`
  margin: 8px;
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
        <OrderTitle>{props.text}</OrderTitle>
        <IconWrapper>
          <OrderIcon orderType={props.type} />
        </IconWrapper>
      </Wrapper>
    </foreignObject>
  </svg>
);

export default OrderHeader;
