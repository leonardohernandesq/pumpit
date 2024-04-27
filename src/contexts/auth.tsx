'use client';

import { auth, db } from "@/service/firebaseConnection";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { useState, createContext, ReactNode, useEffect } from "react";
import { setCookie, destroyCookie } from 'nookies';
import { IRegisterProps } from "@/interface/IRegisterProps";
import { ILoginProps } from "@/interface/ILoginProps";
import { IUserProps } from "@/interface/IUserProps";

interface IAuthContextData{
    user?: IUserProps
    isAuthenticated: boolean;
    loadingAuth: boolean;
    signUp: (credentials: IRegisterProps) => Promise<void>
    signIn: (credentials: ILoginProps) => Promise<void>
    resetPassword: (credentials: string) => Promise<void>
    signOut: () => Promise<void>
    presence?: Array<Date>
    monthPresence: Number
    counterTraining: Number
}

type TAuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({children}: TAuthProviderProps){
    const router = useRouter();
    const [user, setUser] = useState<IUserProps>();
    const isAuthenticated = !!user;
    const [loadingAuth, setLoadingAuth] = useState(false);
    
    const [presence, setPresence] = useState([]);
    const [monthPresence, setMonthPresence] = useState(0);
    const [counterTraining, setCounterTraining] = useState(0);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (usuario) => {
            if (usuario) {
                usuario.getIdToken().then(async (token) => {
                    const userProfile = await getDoc(doc(db, "users", usuario.uid))

                    let data = {
                        uid: usuario.uid,
                        email: usuario.email,
                        ...userProfile.data(),
                    }

                    setUser(data as IUserProps);
                });
            } else {
                setUser(undefined);
            }
        });
    
        return () => unsubscribe();
    }, [])

    useEffect(() => {
        async function getPresence(){
            if(!user){
                return
            }
    
            const docUsers = doc(db, "users", user.uid);
            const docSnap = await getDoc(docUsers);
            setPresence(docSnap.data()?.presence);
    
            try{
                const dates = presence?.map(({ seconds, nanoseconds }: any) => {
                    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
                    return new Date(milliseconds).getMonth() + 1;
                });
                const actualMonth = new Date().getMonth() + 1;
    
                if(dates){
                    const counterThisMonth = dates.filter((day: any) => day === actualMonth).length;
                    setMonthPresence(counterThisMonth);
                }
            } catch {
                console.log('Erro')
            }
        }
    
        getPresence()
    }, [user, presence])

    useEffect(() => {
        async function getTrainingsCounter(){
            if(!user){
                return
            }
            const req = await getDocs(collection(db, 'trainings'));
            const fetchedTrainings = [] as any;
            req.forEach((doc) => {
                fetchedTrainings.push({ id: doc.id, ...doc.data() });
            });
            setCounterTraining(fetchedTrainings.length);
        }
        getTrainingsCounter();
    }, [user])

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
            signOut,
            presence,
            monthPresence,
            counterTraining
        }}> 
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider