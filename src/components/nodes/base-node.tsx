import { Handle, Node, Position, useReactFlow } from "reactflow";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "../ui/context-menu";
import { memo, useCallback, useContext } from "react";
import { NodeDialogContext } from "../providers/node-dialog-provider";

type BaseNodeProps = {
	node: Node;
	children: React.ReactNode;
	top?: boolean;
	bottom?: boolean;
	right?: boolean;
	left?: boolean;
};

function BaseNode({ children, node, top, left, right, bottom }: BaseNodeProps) {
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

					{right && <Handle id="1" type="source" position={Position.Right} />}
					{left && <Handle id="2" type="source" position={Position.Left} />}
					{bottom && <Handle id="3" type="source" position={Position.Bottom} />}
					{top && <Handle id="4" type="source" position={Position.Top} />}
				</div>

				<ContextMenuContent className="w-64">
					<ContextMenuItem onSelect={updateNode}>Update</ContextMenuItem>
					<ContextMenuItem onSelect={deleteNode}>Delete</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenuTrigger>
		</ContextMenu>
	);
}

export default memo(BaseNode);
