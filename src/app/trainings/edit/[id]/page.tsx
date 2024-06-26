'use client'

import { ProtectedRoute } from '../../../../components/ProtectedRoute';
import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConnection';
import { Form, Formik } from 'formik';
import { SectionMain } from '@/components/SectionMain';
import { Button } from '@/components/Button';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import { Input, SelectInput } from '@/components/Input';
import { FaHeart } from 'react-icons/fa';
import { TitlePages } from '@/components/TitlePages';
import { initialValues } from '@/formik/RegisterExerciseSchema';
import { RegisterTrainingSchema } from '@/formik/RegisterTrainingSchema';
import { useRouter } from 'next/navigation';
import { ITraining } from '@/interface/ITraining';
import Timer from '@/components/Timer';

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

    const submitForm = async (values: ITraining) => {
        const { objective, members, checked, datefim, dateini, title } = values
        // Enviar dados do treino

        await addDoc(collection(db, "trainings"), {
            title:title,
            objective:objective,
            members:members,
            checked:checked,
            dateini:dateini,
            datefim:datefim,
            exercise:[]
        }).then((docRef) => {
            setTreino(docRef.id as any);
        }).catch((err) => {
            alert(err);
        })



    }

            return (
                <ProtectedRoute>
                    <SectionMain>
                    <TitlePages title={"Editar Treino"}/>
                    
                    <section className='relative w-full h-60 bg-black rounded-xl bg-[url("/bg-training.svg")] bg-cover bg-center flex justify-center pl-8 flex-col mb-8'>
                        {
                            treino &&
                                <>
                                    {treino?.checked ? <FaHeart size={40} className='text-yellow-400 absolute top-8 right-8' title='Treino Favoritado'/> : <></> }
                                    <h1 className='text-white font-bold text-4xl'>Perna e Quadriceps</h1>
                                    <h3 className='text-white mt-3'><strong>Inicio:</strong> 18:32</h3>
                                    <h3 className='text-white my-1'><strong>Termino:</strong> 19:50</h3>
                                </>
                        }
                    </section>

                    <section className='grid grid-cols-3 gap-5 mt-10 col-span-full'>
                                {
                                    treino.exercise && treino.exercise.map((item, index) => {
                                        return (
                                            <section key={index} className='flex justify-between bg-yellow-300 p-3 items-center rounded-lg shadow-md'>
                                                <div className='flex gap-3 justify-center items-center'>
                                                    <p className='text-xl mr-2'>{item?.exercise}</p>
                                                    <Link href="#">
                                                        <FiEdit size={30} className='border-2 p-1 border-black rounded-md'/>
                                                    </Link>
                                                    <Link href="#">
                                                        <FiTrash2 size={30} className='border-2 p-1 border-red-500 text-red-500 rounded-md'/>
                                                    </Link>
                                                </div>

                                                <p className='text-xl'>{item?.series}x{item?.repetition}</p>
                                            </section>
                                        );
                                    })
                                }
                                

                                <div  className='col-span-full'>
                                    <Button bg='bg-black' color='text-yellow-300' type='button' onClick={() => router.push(`/exercise/${params.id}`)}>Adicionar Exercicio</Button>
                                </div>
                        </section>

                    
                    </SectionMain>
                </ProtectedRoute>
            );
}
