import React, { Children, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import TimelineController from "../TimelineController";
import AxesContainer from "./AxesContainer";
import BufferContext from "../../bufferContext";

import PairSeries from "./PairSeries";
import LineSeries from "./LineSeries";

const DiagramContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Series = ({ serie, height, data }) => {
  if (serie.type === "paired") {
    return (
      <PairSeries
        color={serie.color}
        topHigh={serie.topHigh}
        topLow={serie.topLow}
        bottomHigh={serie.bottomHigh}
        bottomLow={serie.bottomLow}
        height={height}
        topValues={data.topValues}
        bottomValues={data.bottomValues}
      />
    );
  }
  return (
    <LineSeries
      color={serie.color}
      high={serie.high}
      low={serie.low}
      height={height}
      values={data.values}
    />
  );
};

const VitalsDiagram = (props) => {
  const { diagramWidth } = useContext(BufferContext);

  return (
    <DiagramContainer>
      <AxesContainer height={props.height} series={props.series} />
      <svg height={props.height} width={diagramWidth}>
        <g>
          {props.series.map((serie, index) => (
            <Series key={index} serie={serie} height={props.height} data={props.data[index]}/>
          ))}
        </g>
        <TimelineController height={props.height} width={diagramWidth} />
      </svg>
    </DiagramContainer>
  );
};

VitalsDiagram.propTypes = {
  height: PropTypes.number,
  series: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default VitalsDiagram;
