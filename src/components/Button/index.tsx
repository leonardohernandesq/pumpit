import { ButtonHTMLAttributes, ReactNode } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode,
    color: string,
    bg:string,
}

export function Button({children, bg, color, ...rest}:IButtonProps) {
return (
    <button {...rest} className={`${color} ${bg} rounded-lg w-full py-3 mt-5 uppercase hover:brightness-90 transition-all`} >
        {children}
    </button>
)
}