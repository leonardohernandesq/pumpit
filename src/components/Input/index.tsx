import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  styles?: string;
}
interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string | boolean;
}

export function Input({styles, error, ...rest}: IInputProps) {
  return (
    <>
      <input {...rest} className={`${styles} bg-transparent border-0 border-b-2 w-full border-black p-2 mb-3 placeholder:text-gray-600 outline-none focus:invalid:border-red-500 focus:invalid:text-red-500`}/>
      <p className='text-red-500'>
        {error}
      </p>
        
    </>
  )
}

export function TextInput({error, ...rest}: ITextAreaProps) {
  return (
    <>
      <textarea {...rest} className='resize-none bg-transparent border-0 border-b-2 w-full border-black p-2 mb-3 placeholder:text-gray-600 outline-none focus:invalid:border-red-500 focus:invalid:text-red-500'/>
      <p className='text-red-500'>
        {error}
      </p>
        
    </>
  )
}
