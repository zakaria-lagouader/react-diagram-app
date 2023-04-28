import { useCallback } from "react";
import { Button } from "../../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../../ui/dialog";
import { Node } from "reactflow";

type BaseDialogProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSubmit: (result: any) => void;
    children: React.ReactNode
};

export type NodeDialogProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	node: Node | null;
};

function BaseDialog({ open, setOpen, onSubmit, children }: BaseDialogProps) {

	const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);
        const result = Object.fromEntries(formData.entries());
        onSubmit(result)
		setOpen(false);
    }, [onSubmit]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-[480px]">
				<DialogHeader>
					<DialogTitle>Edit Node</DialogTitle>
					<DialogDescription>
						Make changes to your node here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					{children}

					<DialogFooter>
						<Button type="submit">
							Save changes
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default BaseDialog;
