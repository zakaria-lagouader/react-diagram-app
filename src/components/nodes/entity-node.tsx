import { Handle, Position } from "reactflow"
import type { NodeProps } from "reactflow"

type NodeData = {
    title: string;
    attributes: string[]
}

function EntityNode({ data }: NodeProps<NodeData>) {
  return (
    <div className="bg-green-400 border-2 border-black w-[10rem]">
        <div className="text-center text-sm font-semibold py-1 p-2 border-b-2 border-b-black">{data.title}</div>
        <ul className="block py-1">
            {data.attributes.map((attr, i) => (
                <li className="block p-1 text-xs" key={`${data.title}-${i}`}>{attr}</li>
            ))}
        </ul>
        <Handle id="1" type="source" position={Position.Right} />
        <Handle id="2" type="source" position={Position.Left} />
        <Handle id="3" type="source" position={Position.Bottom} />
        <Handle id="4" type="source" position={Position.Top} />
    </div>
  )
}

export default EntityNode