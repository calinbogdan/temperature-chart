import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import BufferContext from "../../bufferContext";
import TimelineController from "../TimelineController";
import AxesContainer from "./AxesContainer";
import LineSeries from "./LineSeries";
import PairSeries from "./PairSeries";
import SeriesFocusContext from "./seriesFocusContext";
import TimelineContext from "../../timelineContext";

const DiagramContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Series = ({ serie, height, data, focused }) => {
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
        focused={focused}
        areaVisible={true}
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
      focused={focused}
    />
  );
};

function focusedLast(series, focusedId) {
  if (!focusedId) {
    return series;
  }
  return [
    ...series.filter((s) => s.id !== focusedId),
    ...series.filter((s) => s.id === focusedId),
  ];
}

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
          {focusedLast(props.series, focusedSeriesId).map((serie, index) => (
            <Series
              key={index}
              serie={serie}
              height={props.height}
              data={props.data[serie.id]}
              focused={focusedSeriesId === serie.id}
            />
          ))}
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
