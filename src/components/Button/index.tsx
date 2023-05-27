import { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    textButton: string,
    color: string,
    bg:string,
}

export function Button({textButton, bg, color, ...rest}:IButtonProps) {
return (
    <button {...rest} className={`${color} ${bg} rounded-lg w-full py-3 mt-5 uppercase hover:brightness-90 transition-all`} >
        {textButton}
    </button>
)
}