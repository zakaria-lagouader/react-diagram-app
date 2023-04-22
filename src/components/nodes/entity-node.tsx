import { useReactFlow } from "reactflow";
import type { NodeProps } from "reactflow";
import BaseNode from "./base-node";

export type NodeData = {
	title: string;
	attributes: string[];
};

function EntityNode({ data, id }: NodeProps<NodeData>) {
	const reactFlowInstance = useReactFlow();
	const node = reactFlowInstance.getNode(id)!;

	return (
		<BaseNode node={node}>
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
			</div>
		</BaseNode>
	);
}

export default EntityNode;
