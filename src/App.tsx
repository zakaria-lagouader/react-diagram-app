import { ReactFlowProvider } from "reactflow";
import DiagramView from "./components/diagram-view";
import Sidebar from "./components/sidebar";
import NodeDialogProvider from "./components/node-dialog-provider";

function App() {
	return (
		<div className="w-screen h-screen overflow-hidden flex">
			<ReactFlowProvider>
				<NodeDialogProvider>
					<DiagramView />
					<Sidebar />
				</NodeDialogProvider>
			</ReactFlowProvider>
		</div>
	);
}

export default App;
