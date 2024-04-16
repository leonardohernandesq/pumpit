'use client'

import Link from 'next/link';
import Image from 'next/image';
import SecondLogo from '../../../public/logo-pump.png'
import { CgGym  } from 'react-icons/cg'
import { CiApple } from 'react-icons/ci'
import { FiHome, FiCalendar, FiUser  } from 'react-icons/fi'
import { useContext, useEffect, useState } from 'react';

import {AuthContext} from '../../contexts/auth'

export function HeaderAuth() {
    const { signOut } = useContext(AuthContext)
    const [getUrl, setGetUrl] = useState("")
    useEffect(() => {
        const getUrlCurrent = window.location.pathname;
        setGetUrl(getUrlCurrent)
    }, [])

    return (
        <header className={`w-80 h-screen bg-[url('/bg-header.png')] bg-no-repeat bg-cover bg-black fixed top-0 left-0 text-yellow-400 flex flex-col`}>
                <section className='w-full flex justify-center py-8 relative'>
                    <Image src={SecondLogo} alt='Logotipo PumpIT' height={70} width={232}/>
                </section>

                <nav className='before:content[""] before:bg-gradient-to-r before:from-yellow-400 before:to-black before:block before:relative before:h-1 before:w-8/12 before:mb-8 grid flex-col gap-4'>
                    <Link href="/dashboard" className={`h-14 w-11/12 rounded-lg flex items-center gap-4 mx-auto p-4 hover:scale-105 transition-all ${getUrl === `/dashboard` ? 'bg-yellow-400 text-black' : 'bg-transparent text-yellow-400'}`}>
                        <FiHome size={30} />
                        <p className= {`${getUrl === '/dashboard' ? 'text-black' : 'text-white'}`} >
                            DashBoard
                        </p>
                    </Link>
                    <Link href="/trainings" className={`h-14 w-11/12 rounded-lg flex items-center gap-4 mx-auto p-4 hover:scale-105 transition-all ${getUrl === `/training` ? 'bg-yellow-400 text-black' : 'bg-transparent text-yellow-400'}`}>
                        <CgGym size={30} />
                        <p className= {`${getUrl === '/training' ? 'text-black' : 'text-white'}`} >
                            Treinos
                        </p>
                    </Link>
                    <Link href="/schedule" className={`h-14 w-11/12 rounded-lg flex items-center gap-4 mx-auto p-4 hover:scale-105 transition-all ${getUrl === `/schedule` ? 'bg-yellow-400 text-black' : 'bg-transparent text-yellow-400'}`}>
                        <FiCalendar size={30} />
                        <p className= {`${getUrl === '/schedule' ? 'text-black' : 'text-white'}`} >
                            Agenda
                        </p>
                    </Link>
                    <Link href="/profile"className={`h-14 w-11/12 rounded-lg flex items-center gap-4 mx-auto p-4 hover:scale-105 transition-all ${getUrl === `/profile` ? 'bg-yellow-400 text-black' : 'bg-transparent text-yellow-400'}`}>
                        <FiUser size={30} />
                        <p className= {`${getUrl === '/profile' ? 'text-black' : 'text-white'}`} >
                            Perfil
                        </p>
                    </Link>
                    <Link href="/nutrition" className={`h-14 w-11/12 rounded-lg flex items-center gap-4 mx-auto p-4 hover:scale-105 transition-all ${getUrl === `/nutrition` ? 'bg-yellow-400 text-black' : 'bg-transparent text-yellow-400'}`}>
                        <CiApple size={30} />
                        <p className= {`${getUrl === '/nutrition' ? 'text-black' : 'text-white'}`} >
                            Nutrição
                        </p>
                    </Link>
                </nav>

                <button onClick={() => signOut()} className='h-10 w-10 border-2 border-red-600 flex justify-center items-center rounded-full p-4 text-red-600 absolute bottom-4 right-4 hover:scale-105 transition-all'>
                    <h1>X</h1>
                </button>
        </header>
    )
}