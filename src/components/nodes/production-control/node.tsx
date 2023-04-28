import { useReactFlow } from "reactflow";
import type { NodeProps } from "reactflow";
import BaseNode from "../base/node";
import { memo } from "react";

export type NodeData = {
	title: string;
};

const ProductionControlNode = memo(({ data, id }: NodeProps<NodeData>) => {
	const reactFlowInstance = useReactFlow();
	const node = reactFlowInstance.getNode(id)!;

	return (
		<BaseNode node={node} right left>
			<div className="bg-white border border-black w-[10rem]">
				<div className="text-center text-sm font-semibold px-2 py-1 border-b border-b-black bg-[#e9eff7]">
					{data.title}
				</div>
				<div className="p-4">

				</div>
			</div>
		</BaseNode>
	);
})

export default ProductionControlNode;
