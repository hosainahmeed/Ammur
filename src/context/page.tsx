'use client';

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface InitialValue {
    name: string;
}

interface AuthContextType {
    initialValues: InitialValue;
    setInitialValues: (values: InitialValue) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [initialValues, setInitialValues] = useState<InitialValue>({
        name: ''
    });

    return (
        <AuthContext.Provider value={{ initialValues, setInitialValues }}>
            {children}
        </AuthContext.Provider>
    );
}


export default function useAuth() {
    const context = useContext(AuthContext);
    return context
}