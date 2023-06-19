'use client'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { SectionMain } from '@/components/SectionMain'
import { TitlePages } from '@/components/TitlePages'
import Image from 'next/image'
import React from 'react'

export default function Profile() {
    return (
        <SectionMain>
            <TitlePages title='Profile'/>

            <section className='grid mt-8 grid-cols-1 gap-6 h-full'>
                <section className='bg-white p-7 rounded-xl box-border flex gap-14'>
                    <div>
                        <Image src={'/about.jpg'} alt='teste' width={280} height={280} className='rounded-xl'/>
                    </div>
                    <div className='grid grid-cols-3 w-full gap-y-4 gap-x-8'>
                        <Input placeholder='Nome: ' type='text'/>
                        <Input placeholder='Data de Nascimento: ' type='date'/>
                        <Input placeholder='Altura: ' type='text'/>
                        <Input placeholder='Peso: ' type='text'/>
                        <Input placeholder='BF: ' type='text'/>
                        <Input placeholder='Massa Muscular:' type='text'/>
                        <Input placeholder='Meta de Peso: ' type='text'/>
                        <Input placeholder='Meta de M.M: ' type='text'/>
                        <Input placeholder='Meta de BF: ' type='text'/>
                    </div>
                </section>
                <section className='bg-white py-6 px-12 rounded-xl flex flex-col items-center'>
                    <h1 className='text-2xl font-bold'>Metas</h1>

                    <section className='w-full grid gap-5'>
                        <section className='flex items-center'>
                            <label className="mr-4 w-32 font-bold" htmlFor="imc">I.M.C: </label>
                            <meter id="imc" value="32" max="100" className='w-full h-14'> 32% </meter>
                        </section>
                        <section className='flex items-center'>
                            <label className="mr-4 w-32 font-bold" htmlFor="imc">B.F Ideal: </label>
                            <meter id="imc" value="32" max="100" className='w-full h-14'> 32% </meter>
                        </section>
                        <section className='flex items-center'>
                            <label className="mr-4 w-32 font-bold" htmlFor="imc">Meta de BF: </label>
                            <meter id="imc" value="32" max="100" className='w-full h-14'> 32% </meter>
                        </section>
                        <section className='flex items-center'>
                            <label className="mr-4 w-32 font-bold" htmlFor="imc">Meta de Peso: </label>
                            <meter id="imc" value="" max="100" className='w-full h-14'> 32% </meter>
                        </section>
                        <section className='flex items-center'>
                            <label className="mr-4 w-32 font-bold" htmlFor="imc">Meta de M.M: </label>
                            <meter id="imc" value="90" max="100" className='w-full h-14'> 32% </meter>
                        </section>
                    </section>
                </section>
                <section>
                    <Button bg='bg-yellow-400' color='black' textButton='Salvar Alterações'></Button>
                </section>
            </section>
        </SectionMain>
    )
}
