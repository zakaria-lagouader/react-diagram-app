import { useRef, useState, useCallback } from "react";
import ReactFlow, {
	Background,
	Controls,
	MarkerType,
	MiniMap,
	ReactFlowProvider,
	addEdge,
	useEdgesState,
	useNodesState,
	BackgroundVariant,
} from "reactflow";

import type { Edge, Node, OnConnect, DefaultEdgeOptions, NodeTypes } from "reactflow";

import "reactflow/dist/style.css";
import EntityNode from "./nodes/entity-node";

const initialNodes: Node[] = [
	{ id: "1", data: { label: "Node 1" }, position: { x: 5, y: 5 } },
	{ id: "2", data: { label: "Node 2" }, position: { x: 5, y: 100 } },
	{
		id: "3",
		data: { title: "Car", attributes: ["color: red", "price: 1MD"] },
		position: { x: 5, y: 300 },
		type: "entity",
	},
];

const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];

const defaultEdgeOptions: DefaultEdgeOptions = {
	animated: true,
	markerEnd: { type: MarkerType.Arrow },
};

const nodeTypes: NodeTypes = {
	entity: EntityNode,
};

function DiagramView() {
	const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);

	const reactFlowWrapper = useRef(null);
	// const [reactFlowInstance, setReactFlowInstance] = useState(null);

	const onConnect: OnConnect = useCallback(
		(connection) => setEdges((eds) => addEdge(connection, eds)),
		[setEdges]
	);

	return (
		<ReactFlowProvider>
			<div className="flex-1 h-full" ref={reactFlowWrapper}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					nodeTypes={nodeTypes}
					defaultEdgeOptions={defaultEdgeOptions}
					fitView
				>
					<Controls />
					<MiniMap />
					<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
				</ReactFlow>
			</div>
		</ReactFlowProvider>
	);
}

export default DiagramView;
