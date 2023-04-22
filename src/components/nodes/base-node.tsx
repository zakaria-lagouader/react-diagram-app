import { Handle, Node, Position, useReactFlow } from "reactflow";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "../ui/context-menu";
import { useCallback, useContext } from "react";
import { NodeDialogContext } from "../providers/node-dialog-provider";

type BaseNodeProps = {
	node: Node;
	children: React.ReactNode;
};

function BaseNode({ children, node }: BaseNodeProps) {
	const { openNodeDialog } = useContext(NodeDialogContext);
	const reactFlowInstance = useReactFlow();

	const deleteNode = useCallback(() => {
		reactFlowInstance.deleteElements({
			nodes: [node],
		});
	}, [node]);

	const updateNode = useCallback(() => {
		openNodeDialog(node);
	}, [node]);

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<div>
					{children}

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

export default BaseNode;
