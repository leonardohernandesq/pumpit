'use client'

import React, {useContext, useEffect, useState} from 'react'
import { Input, TextInput } from '../../../components/Input'
import { Form, Formik } from 'formik'
import { RegisterExerciseSchema, initialValues } from '@/formik/RegisterExerciseSchema'
import { db } from '../../../service/firebaseConnection'
import { AuthContext } from '@/contexts/auth'
import { doc, getDoc, getDocs, query, setDoc, updateDoc, FieldValue, arrayUnion } from 'firebase/firestore'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { SectionMain } from '@/components/SectionMain'
import { TitlePages } from '@/components/TitlePages'
import { Button } from '@/components/Button'

interface INewExercise{
    exercise: string,
    position: string | null,
    series: string,
    observation: string | null,
    repetition: string,
    descanso: string,
    carga: [] | null,
}

export default function Exercise({ params }: { params: { id: string } }) {
const { user } = useContext(AuthContext)
const [trainingList, setTrainingList] = useState<Array<string>>([]);

useEffect(() => {

    async function loadingExercise() {
      // Suponha que você tenha o userid do usuário que deseja recuperar os documentos
        const userid = user?.uid;

        // Crie uma consulta para buscar documentos com base no campo que contém o userid
        const q = doc(db, "trainings", params?.id);
        
        try {
            const querySnapshot = await getDoc(q);
            console.log(querySnapshot);

            setTrainingList(querySnapshot.data() as any);
        } catch (error) {
            console.error("Erro ao obter os documentos do usuário:", error);
        }
    }

    loadingExercise();
    
}, [params?.id, user]);

const submitForm = async(values: any) => {
    // Enviar dados do treino
    console.log("values");
    const { carga, descanso, exercise, observation, position, repetition, series } = values

    if(descanso === '' || exercise === '' || repetition === '' || series === ''){
        alert("Preencha tudo corretamente")
    } else {
        try{
            await updateDoc(doc(db, "trainings", params.id), {
                exercise: arrayUnion(values)
            });
        } catch (error) {
            console.log(error);
        }
        
    }
    
}

return (
    <Formik
        initialValues={initialValues}
        validationSchema={RegisterExerciseSchema}
        onSubmit={(values) => {
            submitForm(values as any);
        }}
    >
    {(formik) => {
        const { values, touched, handleChange } = formik;

        const errors = {
            objective: "",
            members: "",
            dateini: "",
            datefim: "",
            exercise: "",
            position: "",
            series: "",
            repetition: "",
            descanso: "",
            observation: ""
        };

        const errorExercise = errors.exercise && touched.exercise;
        const errorPosition = errors.position && touched.position;
        const errorSeries = errors.series && touched.series;
        const errorRepetition = errors.repetition && touched.repetition;
        const errorDescanso = errors.descanso && touched.descanso;
        const errorObservation = errors.observation && touched.observation;

        return (
            <ProtectedRoute>
                <SectionMain>
                    <TitlePages title='Cadastrar Exercicios'/>
                    <section className='relative w-full h-60 bg-black rounded-xl bg-[url("/bg-training.svg")] bg-cover bg-center flex justify-center pl-8 flex-col mb-8'>
                        <h1 className='text-white text-4xl font-bold'>Adicione seu exercício em um treino</h1>
                    </section>
                        <Form>
                            <section className='grid grid-cols-3 gap-5'>
                                <div className='col-span-1'>
                                    <Input 
                                        placeholder='Exercício'
                                        name='exercise'
                                        onChange={handleChange}
                                        value={values.exercise}
                                        error={errorExercise && errors.exercise}
                                    />
                                </div>
                                <div>
                                    <Input 
                                        placeholder='Posição'
                                        name='position'
                                        onChange={handleChange}
                                        value={values.position}
                                        error={errorPosition && errors.position}
                                    />
                                </div>
                                <div>
                                    <Input 
                                        placeholder='Séries' 
                                        type='number'
                                        name='series'
                                        onChange={handleChange}
                                        value={values.series}
                                        error={errorSeries && errors.series}
                                    />
                                </div>
                                <div>
                                    <Input 
                                        placeholder='Repetições' 
                                        type='number'
                                        name='repetition'
                                        onChange={handleChange}
                                        value={values.repetition}
                                        error={errorRepetition && errors.repetition}
                                    />
                                </div>
                                <div>
                                    <Input 
                                        type='text' 
                                        styles='before:content-["Descanso:"] before:mr-4 before:text-gray-600'
                                        name='descanso'
                                        placeholder='Descanso'
                                        onChange={handleChange}
                                        value={values.descanso}
                                        error={errorDescanso && errors.descanso}
                                    />
                                </div>
                                <div className='col-span-full'>
                                    <TextInput
                                        placeholder='Observação'
                                        name='observation'
                                        onChange={handleChange}
                                        value={values.observation}
                                        error={errorObservation && errors.observation}
                                    />
                                </div>
                                <div className="col-span-full flex items-center justify-end py-6 border-t border-solid border-slate-200 rounded-b">
                                    <Button
                                        bg='bg-yellow-300' color='text-black' type='submit' 
                                    >
                                        Adicionar Exercício
                                    </Button>
                                </div>
                            </section>
                        </Form>
                </SectionMain>
            </ProtectedRoute>
        );
    }}
    </Formik>
);
}