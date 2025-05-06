
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/sonner';

// Função para garantir que o e-mail especificado tenha privilégios de admin
export async function setupAdmin() {
  try {
    const adminEmail = 'guilhermedesouzaborges@gmail.com';
    
    // Verificar se o usuário existe
    const { data: users, error: userError } = await supabase
      .from('usuarios')
      .select('id, role')
      .eq('email', adminEmail);
    
    if (userError) {
      console.error('Erro ao verificar usuário admin:', userError);
      return;
    }
    
    // Se o usuário existe mas não é admin, atualize para admin
    if (users && users.length > 0) {
      if (users[0].role !== 'admin') {
        const { error: updateError } = await supabase
          .from('usuarios')
          .update({ role: 'admin' })
          .eq('email', adminEmail);
        
        if (updateError) {
          console.error('Erro ao definir usuário como admin:', updateError);
          return;
        }
        
        console.log(`Usuário ${adminEmail} definido como admin com sucesso.`);
      } else {
        console.log(`Usuário ${adminEmail} já é admin.`);
      }
    } else {
      console.log(`Usuário com e-mail ${adminEmail} não encontrado. Certifique-se de que o usuário existe.`);
    }
  } catch (error) {
    console.error('Erro no setupAdmin:', error);
  }
}
