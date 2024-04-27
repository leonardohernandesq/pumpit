'use client'

import React, { useContext, useEffect, useState } from 'react'
import { SectionMain } from '@/components/SectionMain'
import { TitlePages } from '@/components/TitlePages'
import { PieChart } from '@/components/PieChart'
import { PresenceSchedule } from '@/components/PresenceSchedule'
import {ProtectedRoute} from '@/components/ProtectedRoute'
import { AuthContext } from '@/contexts/auth'

export default function Dashboard() {
    const { monthPresence, counterTraining } = useContext(AuthContext);

    return (
        <ProtectedRoute>
            <SectionMain>
                <TitlePages title='Painel'/>

                <section className='flex gap-8 justify-between'>
                    <section className='flex flex-col w-3/12 h-40 justify-center rounded-lg bg-[url("/calorias.png")] bg-cover bg-center py-6 px-4'>
                        <h1 className='text-3xl font-bold mb-1'>1042</h1>
                        <p className='text-lg w-40'>CALORIAS GASTAS NA SEMANA</p>
                    </section>
                    <section className='flex flex-col w-3/12 h-40 justify-center rounded-lg bg-[url("/metaagua.png")] bg-cover bg-center py-6 px-4 text-yellow-400'>
                        <h1 className='text-3xl font-bold mb-1'>60%</h1>
                        <p className='text-lg w-40'>DA META DE ÁGUA CONCLUÍDA</p>
                    </section>
                    <section className='flex flex-col w-3/12 h-40 justify-center rounded-lg bg-[url("/treinosdiarios.png")] bg-cover bg-center py-6 px-4'>
                        <h1 className='text-3xl font-bold mb-1'>{monthPresence.toString()}</h1>
                        <p className='text-lg w-40'>DIAS TREINADOS NESTE MÊS</p>
                    </section>
                    <section className='flex flex-col w-3/12 h-40 justify-center rounded-lg bg-[url("/planoscadastrados.png")] bg-cover bg-center py-6 px-4 text-yellow-400'>
                        <h1 className='text-3xl font-bold mb-1'>{counterTraining.toString()}</h1>
                        <p className='text-lg w-40'>PLANOS DE TREINO CADASTRADOS</p>
                    </section>
                </section>

                <section className='grid mt-8 grid-cols-2 gap-6'>
                    <section className='bg-white py-6 px-12 rounded-xl box-border'>
                        <h1 className='text-3xl font-bold mb-4'>Presença Mensal</h1>
                        <PresenceSchedule />
                    </section>
                    <section className='bg-white py-6 px-12 rounded-xl'>
                        <h1 className='text-3xl font-bold mb-4 text-center'>Gráfico de Desempenho</h1>
                        <div className='w-full flex justify-center'>
                            <PieChart />
                        </div>
                    </section>
                </section>
            </SectionMain>
        </ProtectedRoute>
    )   
}