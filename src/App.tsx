import Sidebar from "./components/Sidebar"
import DiagramView from "./components/diagram-view"

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden flex">
		<DiagramView />
		<Sidebar />
    </div>
  )
}

export default App