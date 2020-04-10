import React from "react";
import { AxisLeft } from "d3-components";

import classes from "./VitalsDiagram.module.css";
import { scaleLinear } from "d3";

export default function VitalsDiagram() {
  return (
    <div className={classes.container}>
      <div className={classes.axisContainer}>
        <AxisLeft nested scale={scaleLinear([0, 100], [0, 299])} />
      </div>
      <svg className={classes.diagram} width={1450} height={300}></svg>
    </div>
  );
}
