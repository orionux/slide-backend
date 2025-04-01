// import { useRouter } from 'next/router'
// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// interface AuthContextType {
//   isAuthenticated: boolean
//   login: (token: string, rememberMe: boolean, type: string) => void
//   logout: () => void
//   apiConfig: {
//     headers: {
//       'Access-Control-Allow': boolean
//       'Access-Control-Allow-Origin': string
//       'Content-Type': string
//       Authorization: string
//       'x-api-key': string
//     }
//   }
// }

// // interface formconfig {
// //   headers: {
// //     "Access-Control-Allow": boolean;
// //     "Access-Control-Allow-Origin": string;
// //     "Content-Type": string;
// //     Authorization: string;
// //     "x-api-key": string;
// //   };
// // }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [token, setToken] = useState<string | null>(localStorage.getItem('token') || sessionStorage.getItem('token'))
//   // const [token, setToken] = useState<string | null>(null)
//   const router = useRouter()

//   useEffect(() => {
//     // const token = localStorage.getItem('token') || sessionStorage.getItem('token')
//     // console.log(localStorage.getItem('token'))
//     // console.log(sessionStorage.getItem('token'))

//     if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
//       setToken(localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')? sessionStorage.getItem('token'):'')
//       setIsAuthenticated(true)
//     }else{
//       setIsAuthenticated(false)
//       setToken(null)
//       localStorage.removeItem('userType')
//       router.push('/pages/login')
//     }

//     // if (token) {
//     //   setToken(localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token'))
//     //   setIsAuthenticated(true)
//     // } else {
//     //   router.push('/pages/login')
//     // }


//   }, [])

//   const login = (token: string, rememberMe: boolean, type: string) => {
//     if (rememberMe) {
//       localStorage.setItem('userType', type)
//       localStorage.setItem('token', token)
//       setToken(token)

//     } else {
//       localStorage.setItem('userType', type)
//       sessionStorage.setItem('token', token)
//       setToken(token)
//     }
//     setIsAuthenticated(true)
//   }

//   const logout = () => {
//     localStorage.removeItem('userType')
//     sessionStorage.removeItem('token')
//     localStorage.removeItem('token')
//     setIsAuthenticated(false)
//     router.push('/pages/login')
//   }

//   // const formconfig = {
//   //   headers: {
//   //     "Access-Control-Allow": true,
//   //     "Access-Control-Allow-Origin": "*",
//   //     "Content-Type": "multipart/form-data",
//   //     Authorization: `Bearer ${token}`,
//   //     "x-api-key": "web",
//   //   },
//   // };
//   const apiConfig = {
//     headers: {
//       'Access-Control-Allow': true,
//       'Access-Control-Allow-Origin': '*',
//       'Content-Type': 'multipart/form-data',
//       Authorization: `Bearer ${token}`,
//       'x-api-key': 'web'
//     }
//   }

//   return <AuthContext.Provider value={{ isAuthenticated, login, logout, apiConfig }}>{children}</AuthContext.Provider>
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }



import { useRouter } from 'next/router';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  loading: boolean;
  isAuthenticated: boolean;
  login: (token: string, rememberMe: boolean, type: string) => void;
  logout: () => void;
  apiConfig: {
    headers: {
      'Access-Control-Allow': boolean;
      'Access-Control-Allow-Origin': string;
      'Content-Type': string;
      Authorization: string;
      'x-api-key': string;
    };
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setToken(null);
      localStorage.removeItem('userType');
      router.push('/pages/login'); // Redirect unauthenticated users here
    }
    setLoading(false);
  }, []);
  

  const login = (token: string, rememberMe: boolean, type: string) => {
    // console.log(type)
    if (rememberMe) {
      localStorage.setItem('userType', type);
      localStorage.setItem('token', token);
    } else {
      localStorage.setItem('userType', type);
      sessionStorage.setItem('token', token);
    }
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setToken(null);
    router.push('/pages/login');
  };

  const apiConfig = {
    headers: {
      'Access-Control-Allow': true,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
      'x-api-key': 'web',
    },
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, apiConfig,  loading, }}>
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