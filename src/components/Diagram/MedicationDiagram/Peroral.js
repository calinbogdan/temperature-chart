import PropTypes from "prop-types";
import React, { useContext } from "react";
import TimelineContext from "../../timelineContext";

import { orderBarHeight, orderHeight } from "./constants";
import mapAdministrationTimes from "./mapAdministrationTimes";
import OrderBackground from "./OrderBackground";

const Peroral = (props) => {
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
            <circle
              key={index}
              fill="#555"
              transform={`translate(${timeScale(date)} 30)`}
              cx="0"
              cy="10"
              r="5"
            />
          );
        }
      )}
    </g>
  );
};

Peroral.propTypes = {
  interval: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  minutesSpan: PropTypes.number.isRequired,
};

export default Peroral;
