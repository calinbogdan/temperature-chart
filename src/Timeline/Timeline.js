import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { AxisBottom } from "d3-components";

import TimelineContext from "../contexts/timelineContext";

const TimelineWrapper = styled.svg`
  background: #ddd;
`;
const Timeline = props => {
  const { timeScale, setFullDomain } = useContext(TimelineContext);

  useEffect(() => {
    setFullDomain([props.startTime, props.endTime]);
  }, [props.startTime, props.endTime]);

  return (
    <TimelineWrapper
      width={1415}
      height={40}>
        <AxisBottom scale={timeScale} tickSize={40} color="#888" noText/>
    </TimelineWrapper>
  );
}

Timeline.propTypes = {
  startTime: PropTypes.instanceOf(Date).isRequired,
  endTime: PropTypes.instanceOf(Date).isRequired
}

export default Timeline;
