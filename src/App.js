import React from "react";
import Timeline from "./Timeline/Timeline";
import VitalsDiagram from "./VitalsDiagram/VitalsDiagram";
import { TimelineProvider } from "./contexts/timelineContext";

export default function App() {
  return (
    <div>
      <TimelineProvider>

        <Timeline
          startTime={new Date(2020, 1, 15)}
          endTime={new Date(2021, 1, 15)}
        />
        <VitalsDiagram />
        <VitalsDiagram style={{marginTop: "4px"}}/>
      </TimelineProvider>
    </div>
  );
}
