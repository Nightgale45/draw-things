import { createRootRoute } from "@tanstack/react-router";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function DrawingCanvas() {
  const [nodes, , onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect = useCallback(
    (params: Parameters<typeof addEdge>[0]) =>
      setEdges((els) => addEdge(params, els) as Edge[]),
    [setEdges],
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode="dark"
      >
        <Background />
      </ReactFlow>
    </div>
  );
}

function RootComponent() {
  return (
    <ReactFlowProvider>
      <DrawingCanvas />
    </ReactFlowProvider>
  );
}
