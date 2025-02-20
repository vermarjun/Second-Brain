import { useState, useEffect } from "react";
import { Menu , X } from "lucide-react";
import "./Sidebar.css"; // Import the CSS file for animations
import Header from "./AppHeader";
import TwitterIcon from "/TwitterIcon.png"
import YtIcon from "/YtIcon.png"
import MicIcon from "/MicIcon.png"
import LinkIcon from "/LinkIcon.png";

interface TitleProps {
    text: string,
    icon: any,

}

function Title(props: TitleProps){
    return (
        <div className="flex justify-start items-center gap-4 px-6 hover:bg-gray-200 hover:cursor-pointer rounded-lg py-4">
            <img src={props.icon} alt="" className="h-6"/>
            <p className="text-lg">{props.text}</p>
        </div>
    )
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`sidebar ${isMobile ? (isOpen ? "open" : "closed") : "permanent"} gap-12 bg-white text-black shadow-2xl shadow-neutral-600 fixed top-0 left-0 h-full flex flex-col items-center p-2 w-60`}
      >
        <Header/>
        <div className="flex flex-col h-full w-full gap-1">
            <Title text={"Tweets"} icon={TwitterIcon}/>
            <Title text={"Videos"} icon={YtIcon}/>
            <Title text={"Audio"} icon={MicIcon}/>
            <Title text={"Links"} icon={LinkIcon}/>
        </div>
      </div>

      {/* Floating Hamburger Button on Mobile */}
      {isMobile && !isOpen && (
        <button
          className="fixed top-4 left-4 bg-gray-800 text-white p-2 rounded-full shadow-lg z-50"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}

      {isMobile && isOpen && (
        <button
          className="sidebar fixed top-4 left-63 bg-white p-2 rounded-full shadow shadow-neutral-800 z-50"
          onClick={() => setIsOpen(false)}
        >
          <X color="#000000"  size={24} />
        </button>
      )}
    </>
  )
}