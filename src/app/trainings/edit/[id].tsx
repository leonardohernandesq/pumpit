import ProtectedRoute from '@/components/ProtectedRoute';
import React from 'react'
import { useRouter } from 'next/router';

export default function EditTraining() {
    const router = useRouter();
    const { id } = router.query;
    return (
        <ProtectedRoute>
            <div>
                {id}
            </div>            
        </ProtectedRoute>
    )
}
