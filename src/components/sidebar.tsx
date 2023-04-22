import { cn } from "../lib/utils";
import { ScrollArea } from "./ui/scroll-area";

type ComponentProp = {
	color: string;
	text: string;
	type: string;
};

function Component({ text, color, type }: ComponentProp) {
	const onDragStart: React.DragEventHandler<HTMLDivElement> = (event) => {
		event.dataTransfer.setData("application/reactflow", type);
		event.dataTransfer.effectAllowed = "move";
	};

	return (
		<div
			className={cn(
				"w-full text-white px-4 py-3 font-semibold text-xl text-center cursor-pointer",
				color
			)}
			onDragStart={onDragStart}
			draggable
		>
			{text}
		</div>
	);
}

function Sidebar() {
	return (
		<ScrollArea className="w-[400px] bg-gray-100 h-full p-4">
			<h2 className="mt-10 scroll-m-20 p-4 text-3xl text-center font-semibold tracking-tight transition-colors first:mt-0">
				Select a Component
			</h2>

			<div className="w-full mt-8 space-y-4">
				<Component text="Entity" color="bg-green-400" type="entity" />
				<Component text="Input" color="bg-blue-400" type="input" />
				<Component text="Output" color="bg-pink-400" type="output" />
				<Component text="Default" color="bg-red-400" type="default" />
			</div>
		</ScrollArea>
	);
}

export default Sidebar;
