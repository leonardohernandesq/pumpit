'use client';

import * as C from '@/imports/imports'
import React, { useContext } from 'react'
import { Formik, Form } from 'formik'
import { initialValues, RegisterSchema } from '@/formik/RegisterSchema';
import { AuthContext } from '../../contexts/auth'

interface IRegisterProps{
  email: string,
  password: string,
  confirmPassword: string,
  name: string
} 

export default function Register() {
  const { signUp, isAuthenticated, user } = useContext(AuthContext)

  const submitForm = (values: IRegisterProps) => {
    const {name, email, password } = values
    // if(signUp){
    // }
    console.log(name)
    signUp({email, password, name})
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegisterSchema}
      onSubmit={(values) => {
        submitForm(values)
      }}
    >
      {(formik) => {
        const {values, touched, handleChange} = formik;
        
        const errors = {name: "", email: "", password: "", confirmPassword: ""};

        if(!values.email) {
          errors.email = "E-mail é obrigatório";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Verifique o e-mail digitado";
        }

        if(values.password !== values.confirmPassword){
          errors.confirmPassword = "As senhas não são iguais"
        }

        if(!values.name) {
          errors.name = "Nome é obrigatório"
        }



        const errorName = errors.name && touched.name;
        const errorEmail = errors.email && touched.email;
        const errorPassword = errors.password && touched.password;
        const errorConfirmPassword = errors.confirmPassword && touched.confirmPassword;

        return(
          <main className="h-screen w-screen bg-black bg-[url('/bg-sign.png')] bg-no-repeat bg-cover flex flex-col justify-center items-center">
            <section className='max-w-md w-full p-4'>
              <C.Image alt='Logo da PumpIT' src={"/logo-yellow.png"} width={400} height={120} className='mb-8'/>
              <h1 className='text-center mb-12 text-4xl text-yellow-400 font-racing'>Faça o seu cadastro</h1> 
              <Form>
                <C.Input
                  placeholder='Digite seu Nome'
                  styles='border-yellow-400 text-yellow-400 placeholder:text-yellow-400 p-4'
                  name='name'
                  id='name'
                  onChange={handleChange}
                  value={values.name}
                  error={errorName && errors.name}
                  type='text'
                />
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
                <C.Input
                  placeholder='Digite a Senha'
                  styles='border-yellow-400 text-yellow-400 placeholder:text-yellow-400 p-4'
                  name='password'
                  id='password'
                  onChange={handleChange}
                  value={values.password}
                  error={errorPassword && errors.password}
                  type='password'
                  autoComplete='on'
                  />
                <C.Input
                  placeholder='Confirme a Senha'
                  styles='border-yellow-400 text-yellow-400 placeholder:text-yellow-400 p-4'
                  name='confirmPassword'
                  id='confirmPassword'
                  onChange={handleChange}
                  value={values.confirmPassword}
                  error={errorConfirmPassword && errors.confirmPassword}
                  type='password'
                  autoComplete='on'
                  />
                <C.Button
                  type="submit"
                  bg='bg-yellow-400'
                  color='text-black'>Cadastrar</C.Button>
              </Form>
            </section>
          </main>
        )
      }}
    </Formik>
  )
}