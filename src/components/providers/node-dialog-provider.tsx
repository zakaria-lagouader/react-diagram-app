import React, { createContext, useState } from "react";
import NodeDialog from "../node-dialog";
import { Node } from "reactflow";

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
	const [node, setNode] = useState<Node | null>(null);

    const openNodeDialog = (node: Node) => {
        setNode(node)
        setOpen(true);
    }

    const closeNodeDialog = () => {
        setNode(null)
        setOpen(false);
    }
    
	return (
		<NodeDialogContext.Provider value={{ openNodeDialog, closeNodeDialog }}>
			{children}
			<NodeDialog open={open} setOpen={setOpen} node={node} />
		</NodeDialogContext.Provider>
	);
}

export default NodeDialogProvider;
