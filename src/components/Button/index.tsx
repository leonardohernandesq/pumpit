interface IButtonProps{
    textButton: string,
    color: string,
    bg:string,
}

export function Button({textButton, bg, color, ...rest}:IButtonProps) {
return (
    <>
        <button {...rest} className={`${color} ${bg} rounded-lg w-full py-3 mt-5`} >
            {textButton}
        </button>
    </>
)
}