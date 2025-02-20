import { Button } from "./components/ui/Button"
import Sidebar from "./components/ui/SideBar"
import AddIcon from "/AddIcon.png"
import ShareIcon from "/ShareIcon.png"

function App() {
  return (
    <div className="w-screen h-screen text-black bg-gray-200 flex justify-center items-center gap-10 flex-wrap">
      <Button variant="Primary" size="sm" text="Add Content" startIcon={AddIcon} onClick={()=>console.log("Clicked")}/>
      <Button variant="Secondary" size="md" text="Share Brain" startIcon={ShareIcon} onClick={()=>console.log("Clicked")}/>
      <Button variant="Danger" size="lg" text="Delete" onClick={()=>console.log("Clicked")}/>
        <Sidebar/>
    </div>
  )
}

export default App
