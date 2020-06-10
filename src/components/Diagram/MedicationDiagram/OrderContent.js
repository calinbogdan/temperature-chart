import React from 'react';
import Peroral from "./Peroral";
import ContinousInfusion from "./ContinousInfusion";
import IntermittentInfusion from "./IntermittentInfusion";


const OrderContent = (props) => {
    const interval = [
      new Date(props.data.interval[0]),
      new Date(props.data.interval[1]),
    ];
    switch (props.data.type) {
      case "continous":
        return <ContinousInfusion interval={interval} />;
      case "intermittent":
        return (
          <IntermittentInfusion
            interval={interval}
            minutesSpan={props.data.minutesSpan}
          />
        );
      case "peroral":
        return (
          <Peroral interval={interval} minutesSpan={props.data.minutesSpan} />
        );
    }
  };

export default OrderContent;