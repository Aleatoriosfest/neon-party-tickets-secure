
import { supabase } from './supabase';

/**
 * Set a user as admin
 * @param email Email of the user to set as admin
 */
export const setUserAsAdmin = async (email: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('set-admin', {
      body: { email }
    });
    
    if (error) throw error;
    
    return { success: true, message: data.message };
  } catch (error: any) {
    console.error('Error setting user as admin:', error);
    throw new Error(error.message || 'Failed to set user as admin');
  }
};

/**
 * Initialize the specific admin user when needed
 */
export const initializeAdminUser = async () => {
  try {
    // This is a special function that should only be called once during setup
    // or in development environments
    await setUserAsAdmin('guilhermedesouzaborges@gmail.com');
    return { success: true };
  } catch (error: any) {
    console.error('Error initializing admin user:', error);
    return { success: false, error: error.message };
  }
};
