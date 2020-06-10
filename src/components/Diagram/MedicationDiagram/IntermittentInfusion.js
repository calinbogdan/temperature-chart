import React, { useContext } from "react";
import PropTypes from "prop-types";
import TimelineContext from "../../timelineContext";

import OrderBackground from "./OrderBackground";
import { orderBarHeight, orderHeight } from "./constants";
import mapAdministrationTimes from "./mapAdministrationTimes";

const IntermittentInfusion = (props) => {
  const { timeScale } = useContext(TimelineContext);

  const x = timeScale(props.interval[0]);
  const width = timeScale(props.interval[1]) - timeScale(props.interval[0]);

  return (
    <g>
      <OrderBackground
        height={orderBarHeight}
        y={orderHeight - orderBarHeight}
        x={x}
        width={width}
      />
      {mapAdministrationTimes(props.interval, props.minutesSpan).map(
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

export default IntermittentInfusion;
