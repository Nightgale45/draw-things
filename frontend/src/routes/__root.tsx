import { createRootRoute } from "@tanstack/react-router";
import { ReactFlowProvider } from "@xyflow/react";
import { Canvas } from "../components/Canvas";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  );
}
