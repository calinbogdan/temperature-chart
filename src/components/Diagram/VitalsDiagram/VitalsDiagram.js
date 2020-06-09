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
        normalRangeTop={serie.normalRangeTop}
        normalRangeBottom={serie.normalRangeBottom}
        warningRangeTop={serie.warningRangeTop}
        warningRangeBottom={serie.warningRangeBottom}
        areaVisible={false}
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
      normalRange={serie.normalRange}
      warningRange={serie.warningRange}
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

  const disabledMap = {};
  Object.keys(props.data).forEach((key) => {
    let isDisabled = true;
    if (props.data[key].type === "paired") {
      isDisabled = props.data[key].topValues.length < 0;
    } else {
      isDisabled = props.data[key].values.length < 0;
    }
    disabledMap[key] = isDisabled;
  });

  const setFocusId = (id) => {
    if (id === focusedSeriesId) {
      setFocusedSeriesId(null);
    } else {
      setFocusedSeriesId(id);
    }
  };

  return (
    <DiagramContainer>
      <SeriesFocusContext.Provider value={{ focusedSeriesId, setFocusId }}>
        <AxesContainer
          height={props.height}
          series={props.series}
          disabledMap={disabledMap}
        />
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
