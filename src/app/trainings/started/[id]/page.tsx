'use client'

import { ProtectedRoute } from '../../../../components/ProtectedRoute';
import React, { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConnection';
import { SectionMain } from '@/components/SectionMain';
import { Button } from '@/components/Button';
import { FiClock, FiEdit, FiTrash2 } from 'react-icons/fi';
import { FaHeart, FaPause, FaPlay, FaStop } from 'react-icons/fa';
import Link from 'next/link';
import { TitlePages } from '@/components/TitlePages';
import { useRouter } from 'next/navigation';
import { ITraining } from '@/interface/ITraining';
import Timer from '@/components/Timer';
import { Input } from '@/components/Input';

export default function Page({ params }: { params: { id: string } }) {
    const [treino, setTreino] = useState({} as ITraining);
    const [favorite, setFavorite] = useState<boolean>(false);

    const [isTrainingPaused, setIsTrainingPaused] = useState(false);
    const [isTrainingStarted, setIsTrainingStarted] = useState(false);
    const [isRestPaused, setIsRestPaused] = useState(false);
    const [isRestStarted, setIsRestStarted] = useState(false);

    const [trainingCounter, setTrainingCounter] = useState(0);
    const [restCounter, setRestCounter] = useState(0);

    const router = useRouter();

    useEffect(() => {
        async function getTrainings(){
            const docRef = doc(db, "trainings", params?.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const datefim = docSnap.data().datefim ? new Date(docSnap.data().datefim.seconds * 1000).toISOString().split('T')[0] : '';
                const dateini = docSnap.data().dateini ? new Date(docSnap.data().dateini.seconds * 1000).toISOString().split('T')[0] : '';

                setTreino({ ...docSnap.data(), datefim, dateini } as ITraining);

            } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            }
        }
        getTrainings();
    }, [params]);

            return (
                <ProtectedRoute>
                    <SectionMain>
                        <TitlePages title={"Editar Treino"}/>
                        
                        <div className='flex items-center gap-2 text-2xl justify-center mb-5 font-bold'>
                            <FiClock />
                            <Timer start={isTrainingStarted} finish={isTrainingPaused} />      
                        </div>
                        <section className='relative w-full h-60 bg-black rounded-xl bg-[url("/bg-training.svg")] bg-cover bg-center flex flex-row justify-between items-center p-8 mb-8'>
                            {
                                treino &&
                                    <div>
                                        {treino?.checked ? <FaHeart size={40} className='text-yellow-400 absolute top-8 right-8' title='Treino Favoritado'/> : <></> }
                                        <h1 className='text-white font-bold text-4xl'>Perna e Quadriceps</h1>
                                        <h3 className='text-white mt-3'><strong>Inicio:</strong> {treino?.dateini}</h3>
                                        <h3 className='text-white my-1'><strong>Termino:</strong> {treino?.datefim}</h3>
                                    </div>
                            }

                            <div>
                                <button className='bg-yellow-400 p-10 rounded-lg flex flex-col justify-center items-center' onClick={() => setIsTrainingStarted(!isTrainingStarted)}>
                                    {isTrainingStarted ? <FaStop className='text-4xl'/> : <FaPlay className='text-4xl'/>}
                                    <p className='font-semibold mt-1'>{isTrainingStarted ? 'Finalizar' : 'Iniciar'}</p>
                                </button>
                            </div>
                        </section>

                        <div className='grid grid-cols-2 gap-8'>
                            <section className='border bg-white border-gray-200 shadow-xl rounded-lg p-6'>
                                <h2 className='text-xl font-bold text-center mb-4'>Treino</h2>
                                    
                                <div className='grid grid-cols-2'>
                                    {
                                        treino.exercise && treino.exercise.map((item, index) => {
                                            return (
                                                <section key={index} className='flex flex-row p-1 items-center mb-1'>
                                                    <div className="inline-flex items-center">
                                                        <label className="relative bg-gray-900 flex items-center p-0.5 mr-2 rounded-full cursor-pointer" htmlFor={`checkExercise${index}`}
                                                        data-ripple-dark="true">
                                                            <input id={`checkExercise${index}`} type="checkbox"
                                                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10" />
                                                            <span
                                                                className="absolute text-yellow-400 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                                                stroke="currentColor" stroke-width="1">
                                                                <path fill-rule="evenodd"
                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                    clip-rule="evenodd"></path>
                                                                </svg>
                                                            </span>
                                                            </label>
                                                        <label className="text-base text-gray-700 cursor-pointer select-none" htmlFor={`checkExercise${index}`}>
                                                            {item?.exercise} | {item?.series}x{item?.repetition}
                                                        </label>
                                                    </div>
                                                </section>
                                            );
                                        })
                                    }
                                </div> 
                            </section>
                            <section className='border bg-white border-gray-200 shadow-xl rounded-lg py-6'>
                                <h2 className='text-xl font-bold text-center mb-4'>Descanso</h2>
                                <div className='py-5 flex flex-row bg-black'>
                                    <div className='w-full flex flex-row justify-center gap-2'>
                                        <div className='w-20 flex justify-center items-center bg-yellow-400 p-2 font-bold text-6xl rounded-lg'>0</div>
                                        <div className='w-20 flex justify-center items-center bg-yellow-400 p-2 font-bold text-6xl rounded-lg'>0</div>
                                    </div>
                                    <p className='text-white text-6xl'>:</p>
                                    <div className='w-full flex flex-row justify-center gap-2'>
                                        <div className='w-20 flex justify-center items-center bg-yellow-400 p-2 font-bold text-6xl rounded-lg'>0</div>
                                        <div className='w-20 flex justify-center items-center bg-yellow-400 p-2 font-bold text-6xl rounded-lg'>0</div>
                                    </div>
                                    <p className='text-white text-6xl'>:</p>
                                    <div className='w-full flex flex-row justify-center gap-2'>
                                        <div className='w-20 flex justify-center items-center bg-yellow-400 p-2 font-bold text-6xl rounded-lg'>0</div>
                                        <div className='w-20 flex justify-center items-center bg-yellow-400 p-2 font-bold text-6xl rounded-lg'>0</div>
                                    </div>
                                </div>
                                
                                <div className='flex justify-center mt-4 gap-3'>
                                    <button className='w-14 h-14 flex justify-center items-center bg-yellow-400 rounded-md'><FaPlay className='text-xl'/></button>
                                    <button className='w-14 h-14 flex justify-center items-center bg-black text-yellow-400 rounded-md'><FaPause className='text-xl'/></button>
                                </div>

                            </section>
                        </div>
                    </SectionMain>
                </ProtectedRoute>
            );
}
