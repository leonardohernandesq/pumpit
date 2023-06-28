'use client';

import { auth, db } from "@/service/firebaseConnection";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { useState, createContext, ReactNode, useEffect } from "react";
import { parseCookies, setCookie, destroyCookie } from 'nookies';


interface IAuthContextData{
    user: IUserProps | undefined
    isAuthenticated: boolean;
    loadingAuth: boolean;
    signUp: (credentials: IRegisterProps) => Promise<void>
    signIn: (credentials: ILoginProps) => Promise<void>
    resetPassword: (credentials: string) => Promise<void>
    signOut: () => Promise<void>
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
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (usuario) => {
            if (usuario) {
                setCurrentUrl(window.location.pathname)
                usuario.getIdToken().then(async (token) => {
                const userProfile = await getDoc(doc(db, "users", usuario.uid))

                let data = {
                    uid: usuario.uid,
                    email: usuario.email,
                    name: userProfile.data()?.name,
                }

                setUser(data as IUserProps);
                console.log("logado");
                console.log(currentUrl)

                // if(currentUrl === '/' ){
                //     router.push('/');
                // } else {
                //     router.push('/dashboard');
                // }
            });
            } else {
                setUser(undefined);
            }
        });
    
        return () => unsubscribe();
    }, [router, currentUrl])

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
                    metabf:null,
                    presence:[],
                })
                    .then(() => {
                        let data = {
                            uid: uid,
                            email: value.user.email,
                        }
                    
                        setUser(data as IUserProps);
                        setLoadingAuth(false);
                        signIn({email, password});

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
        const token = (await signInWithEmailAndPassword(auth, email, password)).user.getIdToken();
        await signInWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                const userProfile = await getDoc(doc(db, "users", uid))

                let data = {
                    uid: uid,
                    email: value.user.email,
                    name: userProfile.data()?.name,
                }
                setCookie(null, '@pumpit.token', await token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                });
                setUser(data as IUserProps)
                setLoadingAuth(false);
                
                console.log("logado")
                router.push('/dashboard')
        })
    }

    async function resetPassword({email}: any){
        if (user != null) {
            await sendPasswordResetEmail(auth, email)
            .then(async (value) => {
                console.log("senha alterada com sucesso!")
            })
            .catch((e) => {
                console.log("erro ao redefinir a senha!")
            })
        }
    }
    async function signOut(){
        try{
            console.log('Deslogando...');
            destroyCookie(undefined, '@pumpit.token');
            setUser(undefined);
            router.push('/signin');
        } catch(err) {
            console.log(err);
        }
    }

    return(
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loadingAuth,
            signUp,
            signIn,
            resetPassword,
            signOut
        }}> 
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider