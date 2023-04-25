import { useRef, useState, useCallback } from "react";
import ReactFlow, {
	Background,
	Controls,
	MarkerType,
	MiniMap,
	addEdge,
	BackgroundVariant,
	ConnectionMode,
	useNodesState,
	useEdgesState,
} from "reactflow";

import type {
	Node,
	Edge,
	OnConnect,
	DefaultEdgeOptions,
	NodeTypes,
	ReactFlowInstance,
	XYPosition,
} from "reactflow";

import "reactflow/dist/style.css";
import ProcessNode from "./nodes/process-node";
import BoxNode from "./nodes/box-node";
import customerSupplierNode from "./nodes/customer-supplier-node";

const defaultEdgeOptions: DefaultEdgeOptions = {
	animated: true,
	markerEnd: { type: MarkerType.Arrow },
};

const nodeTypes: NodeTypes = {
	process: ProcessNode,
	box: BoxNode,
	"customer-supplier": customerSupplierNode
};

let id = 0;
const getId = () => `dndnode_${id++}`;
const dataByType = {
	process: {
		title: "Process",
		attributes: ["C/T = 300sec", "C/O = 60min"],
	},
	box: {
		title: "Box Node",
	},
	"customer-supplier": {
		title: "customer/supplier",
	},
};
const getNodeByType = (type: string, position: XYPosition): Node => ({
	id: getId(),
	type,
	position,
	data: dataByType[type as keyof typeof dataByType],
});

function DiagramView() {
	const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

	const reactFlowWrapper = useRef<HTMLDivElement>(null);
	const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

	const onConnect: OnConnect = useCallback(
		(connection) => setEdges((eds) => addEdge(connection, eds)),
		[setEdges]
	);

	const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	const onDrop = useCallback(
		(event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault();

			if (reactFlowWrapper.current === null || reactFlowInstance === null) return;

			const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
			const type = event.dataTransfer.getData("application/reactflow");

			// check if the dropped element is valid
			if (typeof type === "undefined" || !type) {
				return;
			}

			const position = reactFlowInstance.project({
				x: event.clientX - reactFlowBounds.left,
				y: event.clientY - reactFlowBounds.top,
			});

			const newNode = getNodeByType(type, position)

			setNodes((nds) => nds.concat(newNode));
		},
		[reactFlowInstance]
	);

	return (
		<div className="flex-1 h-full" ref={reactFlowWrapper}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onInit={setReactFlowInstance}
				onDrop={onDrop}
				onDragOver={onDragOver}
				nodeTypes={nodeTypes}
				defaultEdgeOptions={defaultEdgeOptions}
				connectionMode={ConnectionMode.Loose}
				fitView
			>
				<Controls />
				<MiniMap />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</div>
	);
}

export default DiagramView;
