import { ScrollArea } from "./ui/scroll-area";
import InventoryImage from "../icons/inventory.svg"
import CustomerSupplierImage from "../icons/customer-supplier.svg"
import ExternalShipmentImage from "../icons/external-shipment.svg"
import ProcessImage from "../icons/process.svg"
import ProductionControlImage from "../icons/production-control.svg"
import { useCallback } from "react";

type ComponentProp = {
	text: string;
	type: string;
	image: string;
};

function Component({ text, image, type }: ComponentProp) {
	
	const onDragStart: React.DragEventHandler<HTMLDivElement> = useCallback((event) => {
		event.dataTransfer.setData("application/reactflow", type);
		event.dataTransfer.effectAllowed = "move";
	}, []);

	return (
		<div
			className="flex flex-col items-center p-2 cursor-pointer transition hover:bg-gray-800 rounded-md"
			onDragStart={onDragStart}
			draggable
		>
			<img src={image} className="block w-[5rem] h-[5rem] object-contain" />
			<p className="mt-2 font-semibold">{text}</p>
		</div>
	);
}

function Sidebar() {
	return (
		<ScrollArea className="w-[400px] bg-slate-900 text-white h-full p-4">
			<h2 className="mt-10 scroll-m-20 p-4 text-3xl text-center font-semibold tracking-tight transition-colors first:mt-0">
				Select a Component
			</h2>

			<div className="w-full mt-8 grid grid-cols-2 gap-4">
				<Component text="Process" image={ProcessImage}  type="process" />
				<Component text="Production Control" image={ProductionControlImage}  type="production-control" />
				<Component text="Customer/Supplier" image={CustomerSupplierImage}  type="customer-supplier" />
				<Component text="External Shipment" image={ExternalShipmentImage}  type="external-shipment" />
				<Component text="Inventory" image={InventoryImage} type="inventory" />
			</div>
		</ScrollArea>
	);
}

export default Sidebar;
