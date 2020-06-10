import React, { useContext } from "react";
import PropTypes from "prop-types";
import TimelineContext from "../../timelineContext";

import OrderBackground from "./OrderBackground";
import { orderBarHeight, orderHeight } from "./constants";

const ContinousInfusion = (props) => {
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
      <line
        x1={x}
        x2={x + width}
        y1={orderHeight - orderBarHeight / 2}
        y2={orderHeight - orderBarHeight / 2}
        stroke="#555"
        strokeDasharray="4 2 1 2 4 8"
      />
    </g>
  );
};

ContinousInfusion.propTypes = {
  interval: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
};

export default ContinousInfusion;
