'use client';

import * as C from '@/imports/imports'
import { Formik, Form } from 'formik';
import { initialValues, SignInSchema } from '@/formik/LoginSchema';
import React, { useContext } from 'react'
import { FaFacebookF, FaGoogle, FaApple } from 'react-icons/fa';
import { AuthContext } from '../../contexts/auth';

interface ISignInValues{
  email:string;
  password:string;
}


const Login = () => {
  const { signIn, isAuthenticated, user } = useContext(AuthContext)
  const submitForm = (values: ISignInValues) => {
    const { email, password } = values
    if(signIn){
      signIn({email, password});
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignInSchema}
      onSubmit={(values) => {
        submitForm(values)
      }}
    >
      {(formik) => {
        const { values, touched, handleChange } = formik;

        const errors = {email: "", password: ""};

        if (!values.email) {
          errors.email = "E-mail é obrigatótio";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Verifique o e-mail digitado";
        }

        const errorEmail = errors.email && touched.email;
        const errorPassword = errors.password && touched.password;

        return (
          <main className="h-screen w-screen bg-black bg-[url('/bg-sign.png')] bg-no-repeat bg-cover flex flex-col justify-center items-center">
            <section className='max-w-md w-full p-4'>
              <C.Image alt='Logo da PumpIT' src={"/logo-yellow.png"} width={400} height={120} className='mb-8'/>
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
                <C.Input
                  placeholder='Digite a Senha'
                  styles='border-yellow-400 text-yellow-400 placeholder:text-yellow-400 p-4'
                  name='password'
                  id='password'
                  onChange={handleChange}
                  value={values.password}
                  error={errorPassword && errors.email}
                  type='password'
                />
                <C.Button
                  type="submit"
                  bg='bg-yellow-400'
                  color='text-black'
                  textButton='Acessar'
                />
              </Form>

              <section className='flex gap-12 justify-center mt-8'>
                <button>
                  <FaFacebookF size={30} className='text-yellow-400'/>
                </button>
                <button>
                  <FaGoogle size={30} className='text-yellow-400'/>
                </button>
                <button>
                  <FaApple size={30} className='text-yellow-400'/>
                </button>
              </section>
            </section>
          </main>
        );
      }}
    </Formik>
  )
}

export default Login;