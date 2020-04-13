import React, { useRef, useEffect } from "react";
import Timeline from "./Timeline/Timeline";
import VitalsDiagram from "./VitalsDiagram/components/VitalsDiagram";
import { TimelineProvider } from "./contexts/timelineContext";
import { BufferWidthProvider } from "./contexts/bufferContext";

export default function App() {
  return (
    <div>
      <BufferWidthProvider>
        <TimelineProvider>
          <Timeline
            startTime={new Date(2020, 1, 15)}
            endTime={new Date(2021, 1, 15)}
          />
          <VitalsDiagram />
          <VitalsDiagram style={{ marginTop: "4px" }} />
        </TimelineProvider>
      </BufferWidthProvider>
    </div>
  );
}
