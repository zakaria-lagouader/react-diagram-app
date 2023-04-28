import { useCallback } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { nodes } from "../nodes-config";

type ComponentProp = {
	name: string;
	type: string;
	image: string;
};

function DroppableItem({ name, image, type }: ComponentProp) {
	
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
			<p className="mt-2 font-semibold">{name}</p>
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
				{ nodes.map(node => (
					<DroppableItem key={node.type} name={node.name} image={node.image}  type={node.type} />
				))}
			</div>
		</ScrollArea>
	);
}

export default Sidebar;
