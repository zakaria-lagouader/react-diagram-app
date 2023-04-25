import React, { createContext, useState } from "react";
import { Node } from "reactflow";
import ProductionControlNodeDialog from "../dialogs/production-control-node-dialog";
import ProcessNodeDialog from "../dialogs/process-node-dialog";
import InventoryNodeDialog from "../dialogs/inventory-node-dialog";
import ExternalShipmentNodeDialog from "../dialogs/external-shipment-dialog";
import CustomerSupplierNodeDialog from "../dialogs/customer-supplier-dialog";

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
	"production-control": ProductionControlNodeDialog,
	"inventory": InventoryNodeDialog,
	"external-shipment": ExternalShipmentNodeDialog,
	"customer-supplier": CustomerSupplierNodeDialog,
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
