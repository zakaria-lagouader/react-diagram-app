import type { ComponentType } from "react";
import type { Node, NodeTypes, XYPosition } from "reactflow";
import type { NodeDialogProps } from "./components/nodes/base";
import { ProcessNode, ProcessNodeDialog } from "./components/nodes/process";
import { ProductionControlNode, ProductionControlNodeDialog } from "./components/nodes/production-control";
import { CustomerSupplierNode, CustomerSupplierNodeDialog } from "./components/nodes/customer-supplier";
import { ExternalShipmentNode, ExternalShipmentNodeDialog } from "./components/nodes/external-shipment";
import { InventoryNode, InventoryNodeDialog } from "./components/nodes/inventory";
import InventoryImage from "./icons/inventory.svg"
import CustomerSupplierImage from "./icons/customer-supplier.svg"
import ExternalShipmentImage from "./icons/external-shipment.svg"
import ProcessImage from "./icons/process.svg"
import ProductionControlImage from "./icons/production-control.svg"

type TComponent<T> = {
	type: string;
	name: string;
	image: string;
	component: ComponentType<T>;
	dialog: ComponentType<NodeDialogProps>;
	defaultData: "data" extends keyof T ? T["data"] : never;
};

function createComponent<T>(object: TComponent<T>): TComponent<T> {
	return object;
}


export const nodes = [
	createComponent({
		type: "process",
		name: "Process",
		image: ProcessImage,
		component: ProcessNode,
		dialog: ProcessNodeDialog,
		defaultData: {
			title: "Process",
			attributes: ["C/T = 300sec", "C/O = 60min"],
		},
	}),
	createComponent({
		type: "production-control",
		name: "Production Control",
		image: ProductionControlImage,
		component: ProductionControlNode,
		dialog: ProductionControlNodeDialog,
		defaultData: {
			title: "Production Control",
		},
	}),
	createComponent({
		type: "customer-supplier",
		name: "Customer/Supplier",
		image: CustomerSupplierImage,
		component: CustomerSupplierNode,
		dialog: CustomerSupplierNodeDialog,
		defaultData: {
			title: "Customer/Supplier",
		},
	}),
	createComponent({
		type: "external-shipment",
		name: "External Shipment",
		image: ExternalShipmentImage,
		component: ExternalShipmentNode,
		dialog: ExternalShipmentNodeDialog,
		defaultData: {
			title: "Daily",
		},
	}),
	createComponent({
		type: "inventory",
		name: "Inventory",
		image: InventoryImage,
		component: InventoryNode,
		dialog: InventoryNodeDialog,
		defaultData: {
			title: "100",
		},
	}),
	createComponent({
		type: "inventory",
		name: "Inventory",
		image: InventoryImage,
		component: InventoryNode,
		dialog: InventoryNodeDialog,
		defaultData: {
			title: "100",
		},
	}),
];

export const nodeTypes: NodeTypes = nodes.reduce((prev, current) => {
	return {
		...prev,
		[current.type]: current.component,
	};
}, {});

export const Dialogs = nodes.reduce((prev, current) => {
	return {
		...prev,
		[current.type]: current.dialog,
	};
}, {});

const dataByType = nodes.reduce((prev, current) => {
	return {
		...prev,
		[current.type]: current.defaultData,
	};
}, {});

let id = 0;
const getId = () => `node_id_${id++}`;

type createNodeProps = {
	type: string;
	position: XYPosition
}

export const createNode = ({ type, position }: createNodeProps): Node => ({
	id: getId(),
	type,
	position,
	data: dataByType[type as keyof typeof dataByType],
});




