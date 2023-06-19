import ProtectedRoute from '@/components/ProtectedRoute'
import Link from 'next/link'
import React from 'react'

export default function Nutrition() {
    return (
        <ProtectedRoute>
            <main className='bg-black h-screen w-screen text-yellow-300 flex justify-center items-center flex-col'>
                <h1 className='text-5xl font-bold mb-10'>Página em construção</h1>
                
                <Link href={'/dashboard'} className=' py-3 px-9 '>Voltar para a Dashboard</Link>
            </main>
        </ProtectedRoute>
    )
}
