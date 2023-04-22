import { useReactFlow } from "reactflow";
import type { NodeProps } from "reactflow";
import BaseNode from "./base-node";
import { memo } from "react";

export type NodeData = {
	title: string;
};

function BoxNode({ data, id }: NodeProps<NodeData>) {
	const reactFlowInstance = useReactFlow();
	const node = reactFlowInstance.getNode(id)!;

	return (
		<BaseNode node={node}>
			<div className="bg-blue-400 border-2 border-black w-[10rem]">
				<div className="text-center text-sm font-semibold p-2">
					{data.title}
				</div>
			</div>
		</BaseNode>
	);
}

export default memo(BoxNode);
