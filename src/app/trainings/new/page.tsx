'use client'

import { Button } from '@/components/Button';
import { Input, SelectInput, TextInput } from '@/components/Input';
import { SectionMain } from '@/components/SectionMain';
import { TitlePages } from '@/components/TitlePages';
import { FiTrash2, FiEdit } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import React, { useState } from 'react'
import Link from 'next/link';

export default function NewTraining() {
    const training = false;
    const [favorite, setFavorite] = useState<boolean>(false);
    const [step, setStep] = useState<1 | 2>(1)

    return (
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
            {
                step === 1 ? 
                <>
                    <section className='grid grid-cols-3 gap-5'>
                        <div className='col-span-full'>
                            <Input placeholder='Objetivo'/>
                        </div>
                        <div className='col-span-full'>
                            <SelectInput placeholder='Membros'>
                                <option defaultChecked value="">Membros</option>
                                <optgroup label='Costas'>
                                    <option value="">Costas em geral</option>
                                    <option value="">Latíssimos do dorso</option>
                                    <option value="">Trapézio</option>
                                    <option value="">Romboides</option>
                                    <option value="">Lombares</option>
                                </optgroup>
                                <optgroup label='Peito'>
                                    <option value="">Peito em geral</option>
                                    <option value="">Peitorais maiores (peito)</option>
                                    <option value="">Peitorais menores</option>
                                </optgroup>
                                <optgroup label='Ombro'>
                                    <option value="">Ombro em geral</option>
                                    <option value="">Deltoides (cabeças anterior, medial e posterior)</option>
                                    <option value="">Músculos do manguito rotador (subescapular, supraespinhal, infraespinhal e redondo menor)</option>
                                </optgroup>
                                <optgroup label='Braço'>
                                    <option value="">Braço em geral</option>
                                    <option value="">Bíceps braquial (parte frontal do braço)</option>
                                    <option value="">Tríceps braquial (parte posterior do braço)</option>
                                    <option value="">Braquiais (braquial anterior e posterior)</option>
                                </optgroup>
                                <optgroup label='Perna'>
                                    <option value="">Perna em geral</option>
                                    <option value="">Quadríceps femoral (parte frontal da coxa)</option>
                                    <option value="">Isquiotibiais (parte posterior da coxa)</option>
                                    <option value="">Glúteos (máximo, médio e mínimo)</option>
                                    <option value="">Adutores e abdutores da coxa</option>
                                    <option value="">Gêmeos (panturrilha)</option>
                                </optgroup>
                                <optgroup label='Abdômen'>
                                    <option value="">Abdômen em geral</option>
                                    <option value="">Reto abdominal</option>
                                    <option value="">Oblíquos (externo e interno)</option>
                                    <option value="">Transverso do abdômen</option>
                                </optgroup>
                                <optgroup label='Core'>
                                    <option value="">Core em geral</option>
                                    <option value="">Músculos lombares</option>
                                    <option value="">Músculos do assoalho pélvico</option>
                                    <option value="">Diafragma</option>
                                    <option value="">Multífidos</option>
                                </optgroup>
                            </SelectInput>
                        </div>
                        <div>
                            <label htmlFor="">Data Inicial</label>
                            <Input type='date'/>
                        </div>
                        <div>
                            <label htmlFor="">Data Final</label>
                            <Input type='date'/>
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
                            <Button bg='bg-black' color='text-yellow-300' onClick={() => setStep(2)} textButton={'Próximo Passo'}/>
                        </div>
                    </section>
                </> : 
                
                <>
                    <section>
                        <section className='grid grid-cols-6 gap-5'>
                            <h1 className='text-4xl font-bold mt-5 text-center col-span-full'>Cadastrar Exercícios</h1>

                            <div className='col-span-2'>
                                <Input placeholder='Exercício'/>
                            </div>
                            <div>
                                <Input placeholder='Posição'/>
                            </div>
                            <div>
                                <Input placeholder='Séries' type='number'/>
                            </div>
                            <div>
                                <Input placeholder='Repetições' type='number'/>
                            </div>
                            <div>
                                <Input type='time' styles='before:content-["Descanso:"] before:mr-4 before:text-gray-600'/>
                            </div>
                            <div className='col-span-full'>
                                <TextInput placeholder='Observação' />
                            </div>
                            <div className='col-span-full grid grid-cols-2 gap-44'>
                                <Button bg='bg-black' color='text-yellow-300' textButton={'Voltar'} onClick={() => setStep(1)}/>
                                <Button bg='bg-yellow-300' color='text-black' textButton={training ? 'Editar Treino' : 'Cadastrar Treino'}/>
                            </div>
                        </section>

                        <section className='grid grid-cols-3 gap-5 mt-10'>
                            <section className='flex justify-between bg-yellow-300 p-3 items-center rounded-lg shadow-md'>
                                <div className='flex gap-3 justify-center items-center'>
                                    <p className='text-xl mr-2'>Leg Press 45º</p>
                                    <Link href="#">
                                        <FiEdit size={30} className='border-2 p-1 border-black rounded-md'/>
                                    </Link>
                                    <Link href="#">
                                        <FiTrash2 size={30} className='border-2 p-1 border-red-500 text-red-500 rounded-md'/>
                                    </Link>
                                </div>

                                <p className='text-xl'>4x10</p>
                            </section>
                            <section className='flex justify-between bg-yellow-300 p-3 items-center rounded-lg shadow-md'>
                                <div className='flex gap-3 justify-center items-center'>
                                    <p className='text-xl mr-2'>Leg Press 45º</p>
                                    <Link href="#">
                                        <FiEdit size={30} className='border-2 p-1 border-black rounded-md'/>
                                    </Link>
                                    <Link href="#">
                                        <FiTrash2 size={30} className='border-2 p-1 border-red-500 text-red-500 rounded-md'/>
                                    </Link>
                                </div>

                                <p className='text-xl'>4x10</p>
                            </section>
                            <section className='flex justify-between bg-yellow-300 p-3 items-center rounded-lg shadow-md'>
                                <div className='flex gap-3 justify-center items-center'>
                                    <p className='text-xl mr-2'>Leg Press 45º</p>
                                    <Link href="#">
                                        <FiEdit size={30} className='border-2 p-1 border-black rounded-md'/>
                                    </Link>
                                    <Link href="#">
                                        <FiTrash2 size={30} className='border-2 p-1 border-red-500 text-red-500 rounded-md'/>
                                    </Link>
                                </div>

                                <p className='text-xl'>4x10</p>
                            </section>
                            <section className='flex justify-between bg-yellow-300 p-3 items-center rounded-lg shadow-md'>
                                <div className='flex gap-3 justify-center items-center'>
                                    <p className='text-xl mr-2'>Leg Press 45º</p>
                                    <Link href="#">
                                        <FiEdit size={30} className='border-2 p-1 border-black rounded-md'/>
                                    </Link>
                                    <Link href="#">
                                        <FiTrash2 size={30} className='border-2 p-1 border-red-500 text-red-500 rounded-md'/>
                                    </Link>
                                </div>

                                <p className='text-xl'>4x10</p>
                            </section>
                            <section className='flex justify-between bg-yellow-300 p-3 items-center rounded-lg shadow-md'>
                                <div className='flex gap-3 justify-center items-center'>
                                    <p className='text-xl mr-2'>Leg Press 45º</p>
                                    <Link href="#">
                                        <FiEdit size={30} className='border-2 p-1 border-black rounded-md'/>
                                    </Link>
                                    <Link href="#">
                                        <FiTrash2 size={30} className='border-2 p-1 border-red-500 text-red-500 rounded-md'/>
                                    </Link>
                                </div>

                                <p className='text-xl'>4x10</p>
                            </section>
                            <section className='flex justify-between bg-yellow-300 p-3 items-center rounded-lg shadow-md'>
                                <div className='flex gap-3 justify-center items-center'>
                                    <p className='text-xl mr-2'>Leg Press 45º</p>
                                    <Link href="#">
                                        <FiEdit size={30} className='border-2 p-1 border-black rounded-md'/>
                                    </Link>
                                    <Link href="#">
                                        <FiTrash2 size={30} className='border-2 p-1 border-red-500 text-red-500 rounded-md'/>
                                    </Link>
                                </div>

                                <p className='text-xl'>4x10</p>
                            </section>
                        </section>
                    </section>
                </>
            }



        </SectionMain>
    )
}
