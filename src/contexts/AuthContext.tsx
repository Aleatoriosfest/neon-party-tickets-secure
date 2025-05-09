
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, User } from '@/lib/supabase';
import { toast } from '@/components/ui/sonner';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: 'user' | 'admin') => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Helper function to clean up auth state
const cleanupAuthState = () => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first to prevent race conditions
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, sessionData) => {
        // Use synchronous updates first
        setSession(sessionData);
        
        if (event === 'SIGNED_IN' && sessionData) {
          try {
            // Get user profile data after sign in
            const { data: userData, error: profileError } = await supabase
              .from('usuarios')
              .select('*')
              .eq('id', sessionData.user.id)
              .single();
              
            if (!profileError && userData) {
              setUser({
                id: sessionData.user.id,
                email: sessionData.user.email || '',
                name: userData.name,
                role: userData.role as 'admin' | 'user',
              });
              
              // Redirect based on role
              const redirectPath = localStorage.getItem('redirectAfterLogin');
              
              if (userData.role === 'admin') {
                navigate('/admin-landing');
                toast.success('Bem-vindo ao painel de administração!');
              } else {
                if (redirectPath && redirectPath !== '/auth' && redirectPath !== '/') {
                  localStorage.removeItem('redirectAfterLogin');
                  navigate(redirectPath);
                } else {
                  navigate('/minha-conta');
                }
                toast.success('Login realizado com sucesso!');
              }
            }
          } catch (error) {
            console.error('Error fetching user profile:', error);
          } finally {
            setLoading(false);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          navigate('/');
        }
      }
    );

    // Check active session on mount
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (!error && data?.session) {
          setSession(data.session);
          
          // Get user profile data with role information
          const { data: userData, error: profileError } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id', data.session.user.id)
            .single();
            
          if (!profileError && userData) {
            setUser({
              id: data.session.user.id,
              email: data.session.user.email || '',
              name: userData.name,
              role: userData.role as 'admin' | 'user',
            });
            
            // If we're on the auth page and already logged in, redirect based on role
            if (window.location.pathname === '/auth') {
              if (userData.role === 'admin') {
                navigate('/admin-landing');
              } else {
                navigate('/minha-conta');
              }
            }
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    return () => {
      // Clean up the listener when component unmounts
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Clean up existing state before login
      cleanupAuthState();
      
      // Try global sign out first to prevent authentication limbo
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
        console.log('Global sign out failed, continuing with sign in');
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (error) {
        throw error;
      }

      // User data is set in the auth state change listener
      // We don't need to do anything else here
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast.error(error.message || 'Erro ao fazer login');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, role: 'user' | 'admin' = 'user') => {
    try {
      setLoading(true);
      // Clean up existing state before signup
      cleanupAuthState();
      
      // Sign up the user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            name,
            role
          }
        }
      });

      if (error) {
        throw error;
      }

      if (data?.user) {
        toast.success('Conta criada com sucesso!');
        // The user data is handled in the auth state change listener
      }
    } catch (error: any) {
      console.error('Error signing up:', error);
      toast.error(error.message || 'Erro ao criar conta');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      // Clean up auth state
      cleanupAuthState();
      
      // Attempt global sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      // State is cleaned up in the auth state change listener
      toast.info('Logout realizado com sucesso');
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast.error(error.message || 'Erro ao fazer logout');
    } finally {
      setLoading(false);
    }
  };

  // Add password reset functionality
  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?reset=true`,
      });
      
      if (error) throw error;
      
      toast.success('Email de recuperação enviado', {
        description: 'Verifique sua caixa de entrada para redefinir sua senha.'
      });
      
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast.error(error.message || 'Erro ao solicitar redefinição de senha');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        isAdmin: user?.role === 'admin',
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
