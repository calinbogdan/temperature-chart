import React, { useContext } from "react";
import styled from "styled-components";

import { line, area } from "d3-shape";
import { scaleLinear } from "d3-scale";

import TimelineContext from "../../timelineContext";

const SeriesLine = styled.path`
  fill: none;
  stroke: ${(props) => props.color};
  stroke-width: ${(props) => (props.focused ? 2 : 1)};
  opacity: ${(props) => (props.focused ? 1 : 0.5)};
`;

function getGrouped(top, bottom) {
  return top.map((value, index) => ({
    top: value,
    bottom: bottom[index],
  }));
}

const Range = ({ lowY, highY, fill }) => {
  const y = highY;
  const height = lowY - highY;
  return <rect width="100%" fill={fill} y={y} height={height} />;
};

const DangerRange = () => <rect fill="#ff0000" height="100%" width="100%" />;

const WarningRange = ({ highY, lowY }) => (
  <Range fill="#fff200" highY={highY} lowY={lowY} />
);
const NormalRange = ({ highY, lowY }) => (
  <Range fill="#0be000" highY={highY} lowY={lowY} />
);

const PairSeries = ({
  color,
  topValues,
  bottomValues,
  topHigh,
  topLow,
  bottomHigh,
  bottomLow,
  height,
  areaVisible,
  focused,
  normalRangeTop,
  normalRangeBottom,
  warningRangeTop,
  warningRangeBottom,
}) => {
  const { timeScale } = useContext(TimelineContext);

  const yTopScale = scaleLinear([topLow, topHigh], [height, height / 2]);
  const yBottomScale = scaleLinear([bottomLow, bottomHigh], [height / 2, 0]);

  const topLine = line()
    .x((d) => timeScale(new Date(d.time)))
    .y((d) => yTopScale(d.value));

  const bottomLine = line()
    .x((d) => timeScale(new Date(d.time)))
    .y((d) => yBottomScale(d.value));

  let seriesArea = null;
  if (areaVisible) {
    const areaGen = area()
      .x((d) => timeScale(new Date(d.top.time)))
      .y0((d) => yBottomScale(d.bottom.value))
      .y1((d) => yTopScale(d.top.value));

    const grouped = getGrouped(topValues, bottomValues);

    seriesArea = (
      <path fill={color} opacity={focused ? 0.6 : 0.3} d={areaGen(grouped)} />
    );
  }

  return (
    <g>
      {focused && (
        <g opacity={0.2}>
          <DangerRange />
          <WarningRange
            highY={yTopScale(warningRangeTop.top)}
            lowY={yTopScale(warningRangeTop.low)}
          />
          <WarningRange
            highY={yBottomScale(warningRangeBottom.top)}
            lowY={yBottomScale(warningRangeBottom.low)}
          />
          <NormalRange
            highY={yTopScale(normalRangeTop.top)}
            lowY={yTopScale(normalRangeTop.low)}
          />
          <NormalRange
            highY={yBottomScale(normalRangeBottom.top)}
            lowY={yBottomScale(normalRangeBottom.low)}
          />
        </g>
      )}
      <SeriesLine color={color} d={topLine(topValues)} focused={focused} />
      {seriesArea}
      <SeriesLine
        color={color}
        d={bottomLine(bottomValues)}
        focused={focused}
      />
    </g>
  );
};

export default PairSeries;
