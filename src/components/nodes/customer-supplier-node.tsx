import { useReactFlow } from "reactflow";
import type { NodeProps } from "reactflow";
import BaseNode from "./base-node";
import { memo } from "react";
import CustomerSupplierNodeIcon from "../../icons/customer-supplier.svg"

export type NodeData = {
	title: string;
    type: "customer" | "supplier"
};

function CustomerSupplierNode({ data, type, id }: NodeProps<NodeData>) {
	const reactFlowInstance = useReactFlow();
	const node = reactFlowInstance.getNode(id)!;

	return (
		<BaseNode node={node}>
			<div className="w-[10rem] relative">
                <img src={CustomerSupplierNodeIcon} alt="CustomerSupplierNodeIcon" className="block w-[10rem] h-auto" />
				<div className="text-center text-sm font-semibold absolute inset-0 flex items-center justify-center mt-6">
					{data.title}
				</div>
			</div>
		</BaseNode>
	);
}

export default memo(CustomerSupplierNode);
