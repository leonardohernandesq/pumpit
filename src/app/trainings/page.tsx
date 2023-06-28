import ProtectedRoute from '@/components/ProtectedRoute';
import React from 'react'
import Link from 'next/link';
import { TitlePages } from '@/components/TitlePages';

export default function Trainings() {
    return (
        <ProtectedRoute>

            <TitlePages title="Treinos"/>

            <div>
                Lista
            </div>
            <Link href={"/trainings/new"}>New</Link>
                
        </ProtectedRoute>
    )
}
