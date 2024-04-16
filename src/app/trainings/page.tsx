'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute';
import React, {useContext, useEffect, useState} from 'react'
import { TitlePages } from '@/components/TitlePages';
import { db } from '../../service/firebaseConnection'
import { SectionMain } from '@/components/SectionMain';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';
import { collection, getDocs } from 'firebase/firestore';

export default function Trainings() {
    // const { user } = useContext(AuthContext);
    const router = useRouter();
    const [trainings, setTrainings] = useState<[]>([]);

    useEffect(() => {
    const fetchTrainings = async () => {
        try {
            // Acessar a coleção "trainings" no banco de dados
            const querySnapshot = await getDocs(collection(db, 'trainings'));
            // Mapear os documentos para um array de treinos
            const fetchedTrainings = [] as any;
            querySnapshot.forEach((doc) => {
                fetchedTrainings.push({ id: doc.id, ...doc.data() });
            });
            
            console.log(fetchedTrainings);
            setTrainings(fetchedTrainings);
        } catch (error) {
            console.error('Erro ao buscar treinos:', error);
        }
    };

    fetchTrainings();
}, []);

    return (
        <ProtectedRoute>
            <SectionMain>
                <TitlePages title="Treinos"/>
                <div className='flex justify-between gap-5'>
                    {trainings.map((item: any, index:any) => {
                        return(
                            <div key={index} className='bg-gray-800 w-full flex items-center justify-center h-16 text-white'>
                                <button onClick={() => router.push(`/trainings/edit/${item.id}`)}>
                                    {item.title}
                                </button>
                            </div>
                        )
                    })}
                </div>
                <Button onClick={() => router.push('/trainings/new')} color={''} bg={''}>Adicionar Treino</Button>
            </SectionMain>      
        </ProtectedRoute>
    )
}
