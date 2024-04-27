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
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
    const fetchTrainings = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'trainings'));
            const fetchedTrainings = [] as any;
            querySnapshot.forEach((doc) => {
                fetchedTrainings.push({ id: doc.id, ...doc.data() });
            });
            
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
                <div className='flex justify-between items-start gap-5'>
                    {trainings.map((item: any, index:any) => {
                        return(
                            <div className="w-full" key={index} onMouseEnter={() => setIsPopupOpen(index)} onMouseLeave={() => setIsPopupOpen(false)}>
                                <div  className='bg-gray-800 w-full flex items-center justify-center h-16 text-white'>
                                        {item.title}
                                </div>
                                <div className={`flex-col gap-1 transition-opacity duration-700 ease-in-out ${isPopupOpen === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                    <button className={`bg-yellow-500 p-2 w-full my-1 ${isPopupOpen === index ? 'block' : 'hidden'}`} onClick={() => router.push(`/trainings/edit/${item.id}`)}>Editar</button>
                                    <button className={`bg-yellow-500 p-2 w-full my-1 ${isPopupOpen === index ? 'block' : 'hidden'}`} onClick={() => router.push(`/trainings/started/${item.id}`)}>Iniciar Treino</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='absolute bottom-2 right-10 w-64'>
                    <Button onClick={() => router.push('/trainings/new')} color={''} bg={'bg-yellow-500'}>Adicionar Treino</Button>
                </div>
            </SectionMain>      
        </ProtectedRoute>
    )
}
