import React, { createContext, useState } from "react";
import { Node } from "reactflow";
import BoxNodeDialog from "../dialogs/box-node-dialog";
import ProcessNodeDialog from "../dialogs/process-node-dialog";

type NodeDialogProviderProps = {
	children: React.ReactNode;
};

type NodeDialogContextProps = {
	openNodeDialog: (node: Node) => void;
	closeNodeDialog: () => void
};

export const NodeDialogContext = createContext<NodeDialogContextProps>({} as NodeDialogContextProps);

const Dialogs = {
	process: ProcessNodeDialog,
	box: BoxNodeDialog
}

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
