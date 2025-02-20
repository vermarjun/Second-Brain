import BrainLogo from "/BrainLogo.png"

export default function Header(){
    return (
        <div className="flex justify-start items-center gap-2 w-full text-black px-1 py-2 rounded-lg">
            <img src={BrainLogo} alt="" className="h-10"/>
            <p className="text-2xl font-bold">Second Brain</p>
        </div>
    )
}