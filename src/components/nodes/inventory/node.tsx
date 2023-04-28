import { useReactFlow } from "reactflow";
import type { NodeProps } from "reactflow";
import BaseNode from "../base/node";
import { memo } from "react";
import InventoryNodeIcon from "../../../icons/inventory.svg"

export type NodeData = {
	title: string;
};

const InventoryNode = memo(({ data, id }: NodeProps<NodeData>) => {
	const reactFlowInstance = useReactFlow();
	const node = reactFlowInstance.getNode(id)!;

	return (
		<BaseNode node={node}>
			<div className="w-[5rem]">
                <img src={InventoryNodeIcon} alt="InventoryNodeIcon" className="block w-[5rem] h-auto" />
				<div className="text-center text-sm font-semibold mb-2">
					{data.title}
				</div>
			</div>
		</BaseNode>
	);
})

export default InventoryNode;
