import { toPng } from "html-to-image";
import { Button } from "./ui/button";

function downloadImage(dataUrl: string) {
	const a = document.createElement("a");

	a.setAttribute("download", "screenshot.png");
	a.setAttribute("href", dataUrl);
	a.click();
}

function DownloadButton() {
	const onClick = () => {
		toPng(document.querySelector<HTMLDivElement>(".react-flow")!, {
			filter: (node) => {
				// we don't want to add the minimap and the controls to the image
				if (
					node?.classList?.contains("react-flow__minimap") ||
					node?.classList?.contains("react-flow__controls") ||
					node?.classList?.contains("react-flow__handle") ||
					node?.classList?.contains("react-flow__background") || 
					node?.classList?.contains("react-flow__attribution") 
				) {
					return false;
				}

				return true;
			},
		}).then(downloadImage);
	};

	return (
		<Button className="absolute top-2 right-2 z-50" onClick={onClick}>
			Download Image
		</Button>
	);
}

export default DownloadButton;
