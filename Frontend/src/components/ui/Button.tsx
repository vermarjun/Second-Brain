interface ButtonProps {
    variant: "Primary" | "Secondary" | "Danger";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: any,
    endIcon?: any,
    onClick: () => void;
}

const variantStyles = {
    "Primary": "bg-purple-800 text-purple-100",
    "Secondary": "bg-purple-300 text-purple-700",
    "Danger": "bg-red-500 text-white"
}

export const Button = (props: ButtonProps)=>{
    return (
        <button className={`flex justify-center items-center gap-3 py-2 px-3 rounded-lg hover:cursor-pointer hover:scale-105 transition-all ${variantStyles[props.variant]}`}>
            <img src={props.startIcon} alt="" className="h-5"/>
            <p className="font-semibold">{props.text}</p>
            <img src={props.endIcon} alt="" className="h-5"/>
        </button>
    )
}