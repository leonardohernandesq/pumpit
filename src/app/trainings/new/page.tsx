'use client'

import { Button } from '@/components/Button';
import { Input, SelectInput } from '@/components/Input';
import { Formik, Form } from 'formik';
import { SectionMain } from '@/components/SectionMain';
import { TitlePages } from '@/components/TitlePages';
import { FiTrash2, FiEdit } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import React, { useState, useContext } from 'react'
import Link from 'next/link';
import { RegisterTrainingSchema, initialValues } from '@/formik/RegisterTrainingSchema';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AuthContext } from '@/contexts/auth';
import { db } from '../../../service/firebaseConnection';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

interface INewTraining{
    title:string,
    objective: string,
    members: string,
    dateini: string,
    checked: boolean,
    datefim: string,
    exercise: Array<object>,
}

export default function NewTraining() {
    const training = false;
    const [favorite, setFavorite] = useState<boolean>(false);
    const { user } = useContext(AuthContext);
    const [idTraining, setIdTraining] = useState<string>('');
    const router = useRouter();

    const submitForm = async (values: INewTraining) => {
        const { objective, members, checked, datefim, dateini, title } = values
        // Enviar dados do treino

        await addDoc(collection(db, "trainings"), {
            id_user: user?.uid,
            title:title,
            objective:objective,
            members:members,
            checked:checked,
            dateini:dateini,
            datefim:datefim,
            exercise:[]
        }).then((docRef) => {
            setIdTraining(docRef.id);
            router.push(`/trainings/edit/${docRef.id}`)
        }).catch((err) => {
            alert(err);
        })



    }

    return (
        <Formik
        initialValues={initialValues}
        validationSchema={RegisterTrainingSchema}
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
                title: ""
            };

            const errorObjective = errors.objective && touched.objective;
            const errorTitle = errors.title && touched.title;
            const errorMembers = errors.members && touched.members;
            const errorDateini = errors.dateini && touched.dateini;
            const errorDateFim = errors.datefim && touched.datefim;

            return (
                <ProtectedRoute>
                    <SectionMain>
                    <TitlePages title={training ? "Editar Treino" : "Criar Treino"}/>
                    <section className='relative w-full h-60 bg-black rounded-xl bg-[url("/bg-training.svg")] bg-cover bg-center flex justify-center pl-8 flex-col mb-8'>
                        {
                            training ?
                                <>
                                    {favorite ? <FaHeart size={40} className='text-yellow-400 absolute top-8 right-8' title='Treino Favoritado'/> : <></> }
                                    <h1 className='text-white font-bold text-4xl'>Perna e Quadriceps</h1>
                                    <h3 className='text-white mt-3'><strong>Inicio:</strong> 18:32</h3>
                                    <h3 className='text-white my-1'><strong>Termino:</strong> 19:50</h3>
                                </>
                            :
                                <>
                                    {favorite ? <FaHeart size={40} className='text-yellow-400 absolute top-8 right-8' title='Treino Favoritado'/> : <></> }
                                    <h1 className='text-white text-4xl font-bold'>Criar Treino</h1>
                                    
                                </> 
                        }
                    </section>
                    <Form>
                        <section className='grid grid-cols-3 gap-5'>
                            <div>
                                <Input
                                    placeholder='Título'
                                    name='title'
                                    onChange={handleChange}
                                    value={values.title}
                                    error={errorTitle && errors.title}
                                />
                            </div>
                            <div>
                                <Input
                                    placeholder='Objetivo'
                                    name='objective'
                                    onChange={handleChange}
                                    value={values.objective}
                                    error={errorObjective && errors.objective}
                                />
                            </div>
                            <div>
                                <SelectInput
                                    placeholder='Membros'
                                    name='members'
                                    onChange={handleChange}
                                    value={values.members}
                                    error={errorMembers && errors.members}    
                                >
                                    <option defaultChecked value="">Membros</option>
                                    <optgroup label='Costas'>
                                        <option value="costa-geral">Costas em geral</option>
                                        <option value="latissimo">Latíssimos do dorso</option>
                                        <option value="trapezio">Trapézio</option>
                                        <option value="romboides">Romboides</option>
                                        <option value="lombares">Lombares</option>
                                    </optgroup>
                                    <optgroup label='Peito'>
                                        <option value="peito-geral">Peito em geral</option>
                                        <option value="peito-maior">Peitorais maiores (peito)</option>
                                        <option value="peito-menor">Peitorais menores</option>
                                    </optgroup>
                                    <optgroup label='Ombro'>
                                        <option value="ombro-geral">Ombro em geral</option>
                                        <option value="deltoides">Deltoides (cabeças anterior, medial e posterior)</option>
                                        <option value="manguito">Músculos do manguito rotador (subescapular, supraespinhal, infraespinhal e redondo menor)</option>
                                    </optgroup>
                                    <optgroup label='Braço'>
                                        <option value="braco-geral">Braço em geral</option>
                                        <option value="biceps">Bíceps braquial (parte frontal do braço)</option>
                                        <option value="triceps">Tríceps braquial (parte posterior do braço)</option>
                                        <option value="braquial">Braquiais (braquial anterior e posterior)</option>
                                    </optgroup>
                                    <optgroup label='Perna'>
                                        <option value="perna-geral">Perna em geral</option>
                                        <option value="quadriceps">Quadríceps femoral (parte frontal da coxa)</option>
                                        <option value="isquiotibiais">Isquiotibiais (parte posterior da coxa)</option>
                                        <option value="gluteos">Glúteos (máximo, médio e mínimo)</option>
                                        <option value="adutores">Adutores e abdutores da coxa</option>
                                        <option value="gemeos">Gêmeos (panturrilha)</option>
                                    </optgroup>
                                    <optgroup label='Abdômen'>
                                        <option value="abdomen-geral">Abdômen em geral</option>
                                        <option value="reto">Reto abdominal</option>
                                        <option value="obliquos">Oblíquos (externo e interno)</option>
                                        <option value="transverso">Transverso do abdômen</option>
                                    </optgroup>
                                    <optgroup label='Core'>
                                        <option value="core-geral">Core em geral</option>
                                        <option value="lombares">Músculos lombares</option>
                                        <option value="pelvis">Músculos do assoalho pélvico</option>
                                        <option value="diafragma">Diafragma</option>
                                        <option value="multifidos">Multífidos</option>
                                    </optgroup>
                                </SelectInput>
                            </div>
                            <div>
                                <label htmlFor="dateini">Data Inicial</label>
                                <Input 
                                    type='date'
                                    name='dateini'
                                    onChange={handleChange}
                                    value={values.dateini}
                                    error={errorDateini && errors.dateini}    
                                />
                            </div>
                            <div>
                                <label htmlFor="">Data Final</label>
                                <Input 
                                    type='date'
                                    name='datefim'
                                    onChange={handleChange}
                                    value={values.datefim}
                                    error={errorDateFim && errors.datefim}
                                />
                            </div>

                            <section className="mt-5" title="Favorite este treino para fixa-lo na página de treinos">
                                <label htmlFor="slideTwo" className='flex flex-row items-center justify-end font-bold'>{favorite ? "Desfavoritar Treino:" :"Favoritar Treino:"} 
                                    <div className="slideTwo">  
                                        <input type="checkbox" checked={favorite} onChange={() => setFavorite(!favorite)} id="slideTwo" name="check" />
                                        <label htmlFor="slideTwo" className='slideTwoLabel'></label>
                                    </div>
                                </label>
                            </section>

                            <div  className='col-span-full'>
                                <Button bg='bg-yellow-300' color='text-black' type='submit' >Cadastrar Treino</Button>
                            </div>
                        </section>
                    </Form>
                    
                    </SectionMain>
                </ProtectedRoute>
            );
        }}
        </Formik>

        
    )
}
