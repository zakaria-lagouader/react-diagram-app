import { createContext } from "react";
import { Edge, Node, useEdgesState, useNodesState, NodeChange, EdgeChange } from "reactflow";

type OnChange<ChangesType> = (changes: ChangesType[]) => void;

type DiagramViewProviderProps = {
	children: React.ReactNode;
};

type DiagramViewContextProps = {
	nodes: Node[];
	setNodes: React.Dispatch<React.SetStateAction<Node<Node[], string | undefined>[]>>;
	onNodesChange: OnChange<NodeChange>;
	edges: Edge[];
	setEdges: React.Dispatch<React.SetStateAction<Edge<Edge[]>[]>>;
	onEdgesChange: OnChange<EdgeChange>;
};

export const DiagramViewContext = createContext({} as DiagramViewContextProps);

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

function DiagramViewProvider({ children }: DiagramViewProviderProps) {
	const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);

	const store = {
		nodes,
		setNodes,
		onNodesChange,
		edges,
		setEdges,
		onEdgesChange,
	};
	return <DiagramViewContext.Provider value={store}>{children}</DiagramViewContext.Provider>;
}

export default DiagramViewProvider;
