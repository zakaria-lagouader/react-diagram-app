import React, { createContext, useState } from "react";
import NodeDialog from "./node-dialog";
import { Node } from "reactflow";
import { NodeData } from "./nodes/entity-node";

type NodeDialogProviderProps = {
	children: React.ReactNode;
};

type NodeDialogContextProps = {
	openNodeDialog: (node: Node) => void;
	closeNodeDialog: () => void
};



export const NodeDialogContext = createContext<NodeDialogContextProps>({} as NodeDialogContextProps);

function NodeDialogProvider({ children }: NodeDialogProviderProps) {
	const [open, setOpen] = useState(false);
	const [nodeData, setNodeData] = useState<NodeData | null>(null);

    const openNodeDialog = (node: Node) => {
        setNodeData(node.data)
        setOpen(true);
    }

    const closeNodeDialog = () => {
        setNodeData(null)
        setOpen(false);
    }
    
	return (
		<NodeDialogContext.Provider value={{ openNodeDialog, closeNodeDialog }}>
			{children}
			<NodeDialog open={open} setOpen={setOpen} nodeData={nodeData} />
		</NodeDialogContext.Provider>
	);
}

export default NodeDialogProvider;
