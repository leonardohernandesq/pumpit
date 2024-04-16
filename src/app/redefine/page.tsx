'use client'

import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import { initialValues, RedefineSchema } from '@/formik/RedefineSchema';
import * as C from '@/imports/imports';

export default function Redefine(){
    const { resetPassword, user } = useContext(AuthContext)
    const submitForm = (email: any) => {
        if(resetPassword){
            resetPassword(email);
        }
    }
    
    return (
    <Formik
        initialValues={initialValues}
        validationSchema={RedefineSchema}
        onSubmit={(values) => {
        submitForm(values)
        }}
    >
        {(formik) => {
        const { values, touched, handleChange } = formik;

        const errors = {email: ""};

        if (!values.email) {
            errors.email = "E-mail é obrigatótio";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = "Verifique o e-mail digitado";
        }

        const errorEmail = errors.email && touched.email;

        return (
            <main className="h-screen w-screen bg-black bg-[url('/bg-sign.png')] bg-no-repeat bg-cover flex flex-col justify-center items-center">
            <section className='max-w-md w-full p-4'>
                <h1 className='text-white text-3xl text-center font-bold mb-3'>Redefinição de senha</h1>
                <p className='text-center text-white mb-10'>Digite o seu email para redefinir a senha, chegará em seu email um link para efetuar a redefinição.</p>
                <Form>
                <C.Input
                    placeholder='Digite seu Email'
                    styles='border-yellow-400 text-yellow-400 placeholder:text-yellow-400 p-4'
                    name='email'
                    id='email'
                    onChange={handleChange}
                    value={values.email}
                    error={errorEmail && errors.email}
                    type='email'
                />
                
                <C.Button
                    type="submit"
                    bg='bg-yellow-400'
                    color='text-black'
                >Redefinir Senha</C.Button>
                </Form>

                <Link href="/">Voltar para a página inicial</Link>
            </section>
            </main>
        );
        }}
    </Formik>
    )
}