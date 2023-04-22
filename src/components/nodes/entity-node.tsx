import { Handle, Position, useReactFlow } from "reactflow";
import type { NodeProps } from "reactflow";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "../ui/context-menu";
import { useCallback, useContext } from "react";
import { NodeDialogContext } from "../providers/node-dialog-provider";

export type NodeData = {
	title: string;
	attributes: string[];
};

function EntityNode({ data, id }: NodeProps<NodeData>) {
	const { openNodeDialog } = useContext(NodeDialogContext);

	const reactFlowInstance = useReactFlow();
	const node = reactFlowInstance.getNode(id)!;

	const deleteNode = useCallback(() => {
		reactFlowInstance.deleteElements({
			nodes: [node],
		});
	}, []);

	const updateNode = useCallback(() => {
		openNodeDialog(node);
	}, []);

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<div className="bg-green-400 border-2 border-black w-[10rem]">
					<div className="text-center text-sm font-semibold py-1 p-2 border-b-2 border-b-black">
						{data.title}
					</div>
					<ul className="block py-1">
						{data.attributes.map((attr, i) => (
							<li
								className="block p-1 text-xs border-b border-b-black last:border-b-0"
								key={`${data.title}-${i}`}
							>
								{attr}
							</li>
						))}
					</ul>
					<Handle id="1" type="source" position={Position.Right} />
					<Handle id="2" type="source" position={Position.Left} />
					<Handle id="3" type="source" position={Position.Bottom} />
					<Handle id="4" type="source" position={Position.Top} />
				</div>

				<ContextMenuContent className="w-64">
					<ContextMenuItem onSelect={updateNode}>Update</ContextMenuItem>
					<ContextMenuItem onSelect={deleteNode}>Delete</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenuTrigger>
		</ContextMenu>
	);
}

export default EntityNode;
