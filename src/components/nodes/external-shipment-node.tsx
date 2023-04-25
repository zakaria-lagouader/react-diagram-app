import { useReactFlow } from "reactflow";
import type { NodeProps } from "reactflow";
import BaseNode from "./base-node";
import { memo } from "react";
import ExternalShipmentNodeIcon from "../../icons/external-shipment.svg"

export type NodeData = {
	title: string;
};

function ExternalShipmentNode({ data, id }: NodeProps<NodeData>) {
	const reactFlowInstance = useReactFlow();
	const node = reactFlowInstance.getNode(id)!;

	return (
		<BaseNode node={node}>
			<div className="w-[10rem]">
                <img src={ExternalShipmentNodeIcon} alt="ExternalShipmentNodeIcon" className="block w-[10rem] h-auto" />
				<div className="text-center text-sm font-semibold mb-2">
					{data.title}
				</div>
			</div>
		</BaseNode>
	);
}

export default memo(ExternalShipmentNode);
