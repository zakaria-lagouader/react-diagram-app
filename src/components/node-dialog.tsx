import { useState } from "react"
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { NodeData } from "./nodes/entity-node";

type NodeDialogProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	nodeData: NodeData | null;
}

function NodeDialog({ open, setOpen, nodeData }: NodeDialogProps) {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-[425px]">
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
						<Input id="title" defaultValue={nodeData?.title} className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-right">
							Attributes
						</Label>
						<Input id="username" defaultValue="@peduarte" className="col-span-3" />
					</div>
				</div>
				<DialogFooter>
					<Button type="button" onClick={() => setOpen(false)}>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default NodeDialog;
