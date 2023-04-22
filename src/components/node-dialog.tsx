import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Node } from "reactflow";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";

type NodeDialogProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	node: Node | null;
};

function NodeDialog({ open, setOpen, node }: NodeDialogProps) {

	const [formData, setFormData] = useState({
		title: "",
		attributes: ""
	})

	useEffect(() => {
		if(node === null) return;

		setFormData({
			title: node.data.title,
			attributes: node.data.attributes.join("\n")
		})
	}, [node])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData(data => ({
			...data,
			[e.target.id]: e.target.value
		}))
	}
	
	const updateNode = () => {
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-[480px]">
				<DialogHeader>
					<DialogTitle>Edit Entity</DialogTitle>
					<DialogDescription>
						Make changes to your entity here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="title" className="text-right">
							Title
						</Label>
						<Input
							id="title"
							value={formData.title}
							onChange={handleChange}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="attributes" className="text-right">
							Attributes
						</Label>
						<Textarea
							id="attributes"
							value={formData.attributes}
							onChange={handleChange}
							className="col-span-3"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type="button" onClick={updateNode}>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default NodeDialog;
