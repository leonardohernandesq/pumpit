'use client';

import { auth, db } from "@/service/firebaseConnection";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { useState, createContext, ReactNode } from "react";

interface IAuthContextData{
    user: IUserProps | undefined
    isAuthenticated: boolean;
    loadingAuth: boolean;
    signUp: (credentials: IRegisterProps) => Promise<void>
    signIn: (credentials: ILoginProps) => Promise<void>
}

interface IRegisterProps {
    email: string,
    password: string,
    name:string,
}

interface ILoginProps {
    email: string,
    password: string,
}


type TAuthProviderProps = {
    children: ReactNode
}

interface IUserProps{
    uid:string,
    email: string,
    name:string | null,
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({children}: TAuthProviderProps){
    const router = useRouter();
    const [user, setUser] = useState<IUserProps>();
    const isAuthenticated = !!user;
    const [loadingAuth, setLoadingAuth] = useState(false);

    async function signUp({email, password, name}: IRegisterProps) {
        setLoadingAuth(true);
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                await setDoc(doc(db, "users", uid), {
                    name:name,
                    nascimento:null,
                    altura:null,
                    peso:null,
                    bf:null,
                    mm:null,
                    metapeso:null,
                    metamm:null,
                    metabf:null
                })
                    .then(() => {
                        let data = {
                            uid: uid,
                            email: value.user.email,
                        }
                    
                        setUser(data as IUserProps);
                        setLoadingAuth(false);
                        console.log("Conta Criada")
                })
                .catch((error) => {
                    console.log(error)
                    setLoadingAuth(false)
                })
            })
            .catch(() => {
                console.log("erro ao criar conta")
                setLoadingAuth(false)
            })
    }

    async function signIn({email, password}: ILoginProps ){
        setLoadingAuth(true);
        await signInWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                const userProfile = await getDoc(doc(db, "users", uid))

                let data = {
                    uid: uid,
                    email: value.user.email,
                    name: userProfile.data()?.name,
                }

                setUser(data as IUserProps)
                setLoadingAuth(false);
                
                console.log("logado")
                router.push('/dashboard')
            })
    }

    return(
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loadingAuth,
            signUp,
            signIn
        }}> 
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider