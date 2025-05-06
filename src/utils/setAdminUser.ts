
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/sonner';

export async function setAdminUser(email: string) {
  try {
    // First we need to find the user by email
    const { data: users, error: userError } = await supabase
      .from('usuarios')
      .select('id, email')
      .eq('email', email);
    
    if (userError) {
      throw userError;
    }
    
    if (!users || users.length === 0) {
      toast.error('User not found', {
        description: `No user found with email: ${email}`
      });
      return false;
    }
    
    // User found, now update their role to admin
    const { error: updateError } = await supabase
      .from('usuarios')
      .update({ role: 'admin' })
      .eq('email', email);
    
    if (updateError) {
      throw updateError;
    }
    
    toast.success('Admin rights granted', {
      description: `User ${email} is now an admin`
    });
    return true;
  } catch (error: any) {
    console.error('Error setting admin user:', error);
    toast.error('Error setting admin user', {
      description: error.message || 'An unknown error occurred'
    });
    return false;
  }
}
