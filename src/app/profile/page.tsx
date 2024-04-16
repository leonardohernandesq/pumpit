'use client'

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { SectionMain } from '@/components/SectionMain';
import { TitlePages } from '@/components/TitlePages';
import { initialValues, ProfileSchema } from '@/formik/ProfileSchema';
import { Formik, Form } from 'formik';
import Image from 'next/image';
import React from 'react';

interface IProfileValues{
    altura: string;
    bf: string;
    metabf: string;
    metamm: string;
    metapeso: string;
    mm: string;
    name: string;
    nascimento: string;
    peso: string;
}

export default function Profile() {
    const submitForm = (values: IProfileValues) => {
        const { altura, bf, metabf, metamm, metapeso, mm, name, nascimento, peso } = values

        console.log(values);
    }


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={ProfileSchema}
            onSubmit={(values) => {
                submitForm(values);
            }}
        >
            {(formik) => {
                const { values, touched, handleChange } = formik;

                const errors = {
                    altura: "",
                    bf: "",
                    metabf: "",
                    metamm: "",
                    metapeso: "",
                    mm: "",
                    name: "",
                    nascimento: "",
                    peso: ""
                }

                const errorAltura = errors.altura && touched.altura;
                const errorBf = errors.bf && touched.bf;
                const errorMetaBf = errors.metabf && touched.metabf;
                const errorMetaMm = errors.metamm && touched.metamm;
                const errorMetaPeso = errors.metapeso && touched.metapeso;
                const errorMm = errors.mm && touched.mm;
                const errorName = errors.name && touched.name;
                const errorNascimento = errors.nascimento && touched.nascimento;
                const errorPeso = errors.peso && touched.peso;

                return(
                    <SectionMain>
                        <TitlePages title='Profile'/>

                        <section className='grid mt-8 grid-cols-1 gap-6 h-full'>
                            <section className='bg-white p-7 rounded-xl box-border flex gap-14'>
                                <div>
                                    <Image src={'/about.jpg'} alt='teste' width={280} height={280} className='rounded-xl'/>
                                </div>
                                <Form className='grid grid-cols-4 w-full gap-y-4 gap-x-8'>
                                    <Input
                                        placeholder='Nome: '
                                        type='text'
                                        id='name'
                                        name='name'
                                        onChange={handleChange}
                                        value={values.name}
                                        error={errorName && errors.name}
                                    />
                                    <Input
                                        placeholder='Data de Nascimento: '
                                        type='date'
                                        id='nascimento'
                                        name='nascimento'
                                        onChange={handleChange}
                                        value={values.nascimento}
                                        error={errorNascimento && errors.nascimento}
                                        />
                                    <Input 
                                        placeholder='Altura: ' 
                                        type='text'
                                        id='altura'
                                        name='altura'
                                        onChange={handleChange}
                                        value={values.altura}
                                        error={errorAltura && errors.altura}
                                    />
                                    <Input
                                        placeholder='Peso: '
                                        type='text'
                                        id='peso'
                                        name='peso'
                                        onChange={handleChange}
                                        value={values.peso}
                                        error={errorPeso && errors.peso}
                                    />
                                    <Input
                                        placeholder='BF: '
                                        type='text'
                                        id='bf'
                                        name='bf'
                                        onChange={handleChange}
                                        value={values.bf}
                                        error={errorBf && errors.bf}
                                    />
                                    <Input
                                        placeholder='Massa Muscular:'
                                        type='text'
                                        id='mm'
                                        name='mm'
                                        onChange={handleChange}
                                        value={values.mm}
                                        error={errorMm && errors.mm}
                                    />
                                    <Input 
                                        placeholder='Meta de Peso: ' 
                                        type='text'
                                        id='metapeso'
                                        name='metapeso'
                                        onChange={handleChange}
                                        value={values.metapeso}
                                        error={errorMetaPeso && errors.metapeso}
                                    />
                                    <Input 
                                        placeholder='Meta de M.M: ' 
                                        type='text'
                                        id='metamm'
                                        name='metamm'
                                        onChange={handleChange}
                                        value={values.metamm}
                                        error={errorMetaMm && errors.metamm}
                                        />
                                    <Input 
                                        placeholder='Meta de BF: ' 
                                        type='text'
                                        id='metabf'
                                        name='metabf'
                                        onChange={handleChange}
                                        value={values.metabf}
                                        error={errorMetaBf && errors.metabf}
                                        />
                                    
                                    <Button bg='bg-yellow-400' color='text-black' className='col-span-full'>Enviar</Button>
                                </Form>
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
                                <Button bg='bg-yellow-400' color='black'>Salvar Alterações</Button>
                            </section>
                        </section>
                    </SectionMain>
                )
            }}
        </Formik>
    )
}
