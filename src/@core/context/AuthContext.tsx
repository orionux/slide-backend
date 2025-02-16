import { useRouter } from 'next/router';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, rememberMe: boolean) => void;
  logout: () => void;
  formconfig :{
  headers: {
    "Access-Control-Allow": boolean;
    "Access-Control-Allow-Origin": string;
    "Content-Type": string;
    Authorization: string;
    "x-api-key": string;
  };

}
}

// interface formconfig {
//   headers: {
//     "Access-Control-Allow": boolean;
//     "Access-Control-Allow-Origin": string;
//     "Content-Type": string;
//     Authorization: string;
//     "x-api-key": string;
//   };
// }

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      setToken(token)
      setIsAuthenticated(true);
    }else{
      router.push('/pages/login');
    }
  }, []);

  const login = (token: string, rememberMe: boolean) => {
    if (rememberMe) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    localStorage.removeItem('userType');
    // sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/pages/login');
  };

  const formconfig = {
    headers: {
      "Access-Control-Allow": true,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
      "x-api-key": "web",
    },
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout ,formconfig }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};