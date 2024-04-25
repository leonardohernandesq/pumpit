'use client';

import { useRouter } from 'next/navigation';
import { createContext, ReactNode } from "react";

interface IAuthContextData{
}

type TAuthProviderProps = {
    children: ReactNode
}

export const TrainingContext = createContext({} as IAuthContextData);

export function TrainingProvider({children}: TAuthProviderProps){
    const router = useRouter();
    
    return(
        <TrainingContext.Provider value={{
        }}> 
            {children}
        </TrainingContext.Provider>
    );
}

export default TrainingProvider