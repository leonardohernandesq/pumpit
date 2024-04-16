import React, { ReactNode } from 'react'
import { HeaderAuth } from '../../components/HeaderAuth'

export function SectionMain({children}: any) {
    return (         
            <div className='w-full h-screen '>
                <HeaderAuth />
                <main className='ml-80 px-10 py-6 grid'>
                    {children}
                </main>
            </div>
    )   
}