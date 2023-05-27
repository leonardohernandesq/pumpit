'use client';

import * as C from '@/imports/imports'
import React, { FormEvent } from 'react'

export default function SignUp() {
  function handleRegister(e:FormEvent){
    e.preventDefault();
    alert('Cadastrar')
  }


  return (
    <main className="h-screen w-screen bg-black bg-[url('/bg-sign.png')] bg-no-repeat bg-cover flex flex-col justify-center items-center">
      <section className='max-w-md w-full p-4'>
        <C.Image alt='Logo da PumpIT' src={"/logo-yellow.png"} width={400} height={120} className='mb-8'/>
        <h1 className='text-center mb-12 text-4xl text-yellow-400 font-racing'>Faça o seu cadastro</h1> 
        <form onSubmit={(e) => handleRegister(e)}>
          <C.Input placeholder='Digite seu Email' styles='border-yellow-400 text-yellow-400 placeholder:text-yellow-400 p-4'/>
          <C.Input placeholder='Digite a Senha' styles='border-yellow-400 text-yellow-400 placeholder:text-yellow-400 p-4'/>
          <C.Input placeholder='Confirme a Senha' styles='border-yellow-400 text-yellow-400 placeholder:text-yellow-400 p-4'/>
          <C.Button type="submit" bg='bg-yellow-400' color='text-black' textButton='Cadastrar'/>
        </form>
      </section>
    </main>
  )
}
