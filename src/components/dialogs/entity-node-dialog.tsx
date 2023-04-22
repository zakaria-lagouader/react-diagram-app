import { useReactFlow } from "reactflow";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import BaseDialog, { NodeDialogProps } from "./base-dialog";
import { isEmpty } from "../../lib/utils";
import { Textarea } from "../ui/textarea";


function EntityNodeDialog({ open, setOpen, node }: NodeDialogProps) {
    const reactFlowInstance = useReactFlow();

    const handleSubmit = (result: any) => {
        if (node === null || isEmpty(result)) return;

		reactFlowInstance.setNodes(nds => nds.map(n => {
			if(node.id === n.id) {
				n.data = {
					title: result.title,
                    attributes: result.attributes.split("\n")
				}
			}

			return n;
		}));
		setOpen(false);
    }

	return (
		<BaseDialog open={open} setOpen={setOpen} onSubmit={handleSubmit}>
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="title" className="text-right">
						Title
					</Label>
					<Input
						id="title"
						name="title"
						defaultValue={node?.data.title}
						className="col-span-3"
					/>
				</div>
                <div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="attributes" className="text-right">
							Attributes
						</Label>
						<Textarea
							id="attributes"
							name="attributes"
							defaultValue={node?.data.attributes.join("\n")}
							className="col-span-3"
						/>
					</div>
			</div>
		</BaseDialog>
	);
}

export default EntityNodeDialog;
