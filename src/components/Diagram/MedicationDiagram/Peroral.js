import React, { useContext } from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";

import TimelineContext from "../../timelineContext";

const ORDER_HEIGHT = 50;
const ORDER_BAR_HEIGHT = 20;

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

const MedicationOrderBackground = styled.rect`
  fill: #dbf1ff;
  stroke: #888;
  stroke-width: 0.25;
`;

const Peroral = (props) => {
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