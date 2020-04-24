import React, { useRef, useEffect } from "react";
import Timeline from "./Timeline/Timeline";
import VitalsDiagram from "./VitalsDiagram/components/VitalsDiagram";
import { TimelineProvider } from "./contexts/timelineContext";
import { BufferWidthProvider } from "./contexts/bufferContext";

import series from "./assets/series.json";

export default function App() {
  return (
    <div>
      <BufferWidthProvider width={1500}>
        <TimelineProvider>
          <Timeline
            startTime={new Date(2020, 1, 15)}
            endTime={new Date(2020, 1, 21)}
          />
          <VitalsDiagram series={series.map(serie => ({
            ...serie,
            values: serie.values.map(value => ({
              ...value,
              time: new Date(value.time)
            }))
          }))} />
        </TimelineProvider>
      </BufferWidthProvider>
    </div>
  );
}
