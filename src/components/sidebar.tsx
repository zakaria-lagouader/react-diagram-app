import { cn } from "../lib/utils";

type ComponentProp = {
  color: string;
  text: string;
  
}

function Component({ text, color } : ComponentProp) {
  return (
    <div className={cn("w-full text-white px-4 py-3 font-semibold text-xl text-center cursor-pointer", color)}>
      { text }
    </div>
  )
}

function Sidebar() {
  return (
    <div className='w-[400px] bg-gray-100 h-full p-4'>
      <h2 className="mt-10 scroll-m-20 p-4 text-3xl text-center font-semibold tracking-tight transition-colors first:mt-0">
        Select a Component
      </h2>

      <div className="w-full mt-8 space-y-4">
        <Component text="Component 1" color="bg-blue-400" />
        <Component text="Component 2" color="bg-red-400" />
        <Component text="Component 3" color="bg-green-400" />
        <Component text="Component 4" color="bg-pink-400" />
      </div>
    </div>
  )
}

export default Sidebar