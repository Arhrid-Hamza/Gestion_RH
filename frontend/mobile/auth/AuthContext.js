import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
        try {
            const stored = await AsyncStorage.getItem('user');
            if (stored) setUser(JSON.parse(stored));
        } catch (e) {
            console.warn('Auth load error', e);
        }
        })();
    }, []);

    const signIn = async (userData) => {
        setUser(userData);
        try {
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        } catch (e) {
        console.warn('Auth save error', e);
        }
    };

    const signOut = async () => {
        setUser(null);
        try {
        await AsyncStorage.removeItem('user');
        } catch (e) {
        console.warn('Auth remove error', e);
        }
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
        {children}
        </AuthContext.Provider>
    );
};
