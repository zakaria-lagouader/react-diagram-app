import { useRef, useState, useCallback, useContext } from "react";
import ReactFlow, {
	Background,
	Controls,
	MarkerType,
	MiniMap,
	addEdge,
	useEdgesState,
	useNodesState,
	BackgroundVariant,
	ReactFlowInstance,
	ConnectionMode,
} from "reactflow";

import type { Edge, Node, OnConnect, DefaultEdgeOptions, NodeTypes } from "reactflow";

import "reactflow/dist/style.css";
import EntityNode from "./nodes/entity-node";
import { NodeDialogContext } from "./node-dialog-provider";

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

const defaultEdgeOptions: DefaultEdgeOptions = {
	animated: true,
	markerEnd: { type: MarkerType.Arrow },
};

const nodeTypes: NodeTypes = {
	entity: EntityNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

function DiagramView() {
	const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);

	const reactFlowWrapper = useRef<HTMLDivElement>(null);
	const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

	const onConnect: OnConnect = useCallback(
		(connection) => setEdges((eds) => addEdge(connection, eds)),
		[setEdges]
	);

	const { openNodeDialog } = useContext(NodeDialogContext);

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

			const newNode: Node = {
				id: getId(),
				type,
				position,
				data: {
					title: "Entity",
					attributes: ["attr1: value 1", "attr2: value 2"],
					label: "test",
				},
			};

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
				onNodeClick={(_, node) => {
					openNodeDialog(node);
				}}
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
