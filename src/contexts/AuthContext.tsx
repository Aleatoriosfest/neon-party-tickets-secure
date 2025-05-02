
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, User } from '@/lib/supabase';
import { toast } from '@/components/ui/sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: 'user' | 'admin') => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active sessions and set user on mount
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error fetching session:', error);
          setUser(null);
        } else if (data?.session) {
          // Get user profile data with role information
          const { data: userData, error: profileError } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id', data.session.user.id)
            .single();
            
          if (profileError) {
            console.error('Error fetching user profile:', profileError);
          } else if (userData) {
            setUser({
              id: data.session.user.id,
              email: data.session.user.email || '',
              name: userData.name || '',
              role: userData.role || 'user',
            });
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Get user profile data after sign in
          const { data: userData, error: profileError } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (!profileError && userData) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              name: userData.name || '',
              role: userData.role || 'user',
            });
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (error) {
        throw error;
      }

      if (data?.user) {
        // Get user profile data with role information
        const { data: userData, error: profileError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          toast.error('Erro ao carregar perfil do usuário');
        } else if (userData) {
          setUser({
            id: data.user.id,
            email: data.user.email || '',
            name: userData.name || '',
            role: userData.role || 'user',
          });
          
          // Redirect based on role
          if (userData.role === 'admin') {
            navigate('/admin');
            toast.success('Bem-vindo ao painel de administração!');
          } else {
            navigate('/meus-ingressos');
            toast.success('Login realizado com sucesso!');
          }
        }
      }
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast.error(error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, role: 'user' | 'admin' = 'user') => {
    try {
      setLoading(true);
      // Sign up the user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
      });

      if (error) {
        throw error;
      }

      if (data?.user) {
        // Create user profile in usuarios table with role
        const { error: profileError } = await supabase
          .from('usuarios')
          .insert([
            { 
              id: data.user.id,
              email,
              name,
              role
            }
          ]);

        if (profileError) {
          console.error('Error creating user profile:', profileError);
          throw profileError;
        }

        setUser({
          id: data.user.id,
          email: email,
          name: name,
          role: role,
        });
        
        toast.success('Conta criada com sucesso!');
        
        // Redirect based on role
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/meus-ingressos');
        }
      }
    } catch (error: any) {
      console.error('Error signing up:', error);
      toast.error(error.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      navigate('/');
      toast.info('Logout realizado com sucesso');
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast.error(error.message || 'Erro ao fazer logout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
