import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import BufferContext from "../../bufferContext";
import TimelineController from "../TimelineController";
import AxesContainer from "./AxesContainer";
import LineSeries from "./LineSeries";
import PairSeries from "./PairSeries";
import SeriesFocusContext from "./seriesFocusContext";



const DiagramContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Series = ({ serie, height, data, high }) => {
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
  const [focusedSeriesId, setFocusedSeriesId] = useState(null);

  return (
    <DiagramContainer>
      <SeriesFocusContext.Provider
        value={{
          focusedSeriesId,
          setFocusId: (id) => {
            if (id === focusedSeriesId) {
              setFocusedSeriesId(null);
            } else {
              setFocusedSeriesId(id);
            }
          },
        }}
      >
        <AxesContainer height={props.height} series={props.series} />
        <svg height={props.height} width={diagramWidth}>
          <g>
            {props.series.map((serie, index) => (
              <Series
                key={index}
                serie={serie}
                height={props.height}
                data={props.data[index]}
                focused={focusedSeriesId === serie.id}
              />
            ))}
          </g>
          <TimelineController height={props.height} width={diagramWidth} />
        </svg>
      </SeriesFocusContext.Provider>
    </DiagramContainer>
  );
};

VitalsDiagram.propTypes = {
  height: PropTypes.number,
  series: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default VitalsDiagram;
