import type { Node } from "reactflow";
import React, { createContext, useState } from "react";
import { Dialogs } from "../../nodes-config";

type NodeDialogProviderProps = {
	children: React.ReactNode;
};

type NodeDialogContextProps = {
	openNodeDialog: (node: Node) => void;
	closeNodeDialog: () => void
};

export const NodeDialogContext = createContext<NodeDialogContextProps>({} as NodeDialogContextProps);


const Empty = (_: any) => <></>

function NodeDialogProvider({ children }: NodeDialogProviderProps) {
	const [open, setOpen] = useState(false);
	const [node, setNode] = useState<Node | null>(null);

	const NodeDialogByType = node !== null ? Dialogs[node.type as keyof typeof Dialogs]: Empty

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
			<NodeDialogByType open={open} setOpen={setOpen} node={node} />
		</NodeDialogContext.Provider>
	);
}

export default NodeDialogProvider;
