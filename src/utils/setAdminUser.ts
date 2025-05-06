
import { supabase } from '@/lib/supabase';

/**
 * Sets a user as admin in the database
 * This function needs to be called manually when needed
 */
export const setUserAsAdmin = async (email: string) => {
  try {
    // First find the user in the auth.users table by email
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      throw new Error(`Error fetching users: ${userError.message}`);
    }
    
    // Check if userData and userData.users are defined
    if (!userData || !userData.users || !Array.isArray(userData.users)) {
      throw new Error('No user data returned or invalid format');
    }
    
    const user = userData.users.find(u => u.email === email);
    
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    
    // Update the user in the usuarios table
    const { error: updateError } = await supabase
      .from('usuarios')
      .update({ role: 'admin' })
      .eq('id', user.id);
    
    if (updateError) {
      throw new Error(`Error updating user role: ${updateError.message}`);
    }
    
    console.log(`User with email ${email} has been set as admin`);
    return { success: true };
    
  } catch (error: any) {
    console.error('Error setting user as admin:', error.message);
    return { success: false, error: error.message };
  }
};

// Example usage for guilhermedesouzaborges@gmail.com:
// await setUserAsAdmin('guilhermedesouzaborges@gmail.com');
