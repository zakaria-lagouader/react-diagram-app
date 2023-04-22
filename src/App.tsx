import { ReactFlowProvider } from "reactflow";
import DiagramView from "./components/diagram-view";
import Sidebar from "./components/sidebar";
import NodeDialogProvider from "./components/providers/node-dialog-provider";
import DiagramViewProvider from "./components/providers/diagram-view-provider";

function App() {
	return (
		<div className="w-screen h-screen overflow-hidden flex">
			<ReactFlowProvider>
				<DiagramViewProvider>
					<NodeDialogProvider>
						<DiagramView />
						<Sidebar />
					</NodeDialogProvider>
				</DiagramViewProvider>
			</ReactFlowProvider>
		</div>
	);
}

export default App;
