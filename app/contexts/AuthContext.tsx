'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

interface User {
    id: number;
    username: string;
    roles: string[];
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<any>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get('http://localhost:8080/api/auth/me')
                .then(response => {
                    setUser(response.data);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                    setUser(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setUser(null);
            setLoading(false);
        }
    }, []);

    const login = async (username: string, password: string) => {
        const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
        const { token, roles } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('roles', JSON.stringify(roles));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(response.data);
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}; 