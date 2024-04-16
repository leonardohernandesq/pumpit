'use client'

import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth'
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function ProtectedRoute({ children }:any){
    
    const { signOut, isAuthenticated } = useContext(AuthContext);
    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
        } else {
            signOut();
        }
    });

    return(
        isAuthenticated ? 
        <>
            {children}
        </>
        
        :
        <section className='w-screen h-screen flex flex-col items-center justify-center bg-black'>
            <span className='h-8 w-8 border-2 animate-spin border-yellow-400 border-t-transparent rounded-full mb-5'></span>
            <h1 className='text-yellow-400'>Carregando...</h1>
        </section>
    
    );
};