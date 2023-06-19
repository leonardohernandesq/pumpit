'use client'

import { AuthContext } from '@/contexts/auth';
import React, { useContext } from 'react'

interface IPropsHeader{
    title: string,
}

export function TitlePages({title}: IPropsHeader) {

    const {user} = useContext(AuthContext);

    return (         
        <header className='w-full py-3 mb-5 flex justify-between'>
            <h1 className='font-bold text-2xl'>{title}</h1>
            <h2>{user ? `Bem-Vindo ${user.name}` : "Bem-Vindo" }</h2>
        </header>
    )   
}