import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, CreditCard, QrCode } from 'lucide-react';

const PixPayment: React.FC = () => {
  const [ticketType, setTicketType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [showQRCode, setShowQRCode] = useState(false);
  const pixKey = 'beatrizsilva8282@gmail.com'; // Chave PIX fornecida
  
  // Check if user is logged in
  const currentUser = localStorage.getItem('currentUser') 
    ? JSON.parse(localStorage.getItem('currentUser') || '{}') 
    : null;
    
  // Load saved form data from session storage if available
  useEffect(() => {
    const savedFormData = sessionStorage.getItem('ticketFormData');
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      setTicketType(formData.ticketType || '');
      setName(formData.name || '');
      setEmail(formData.email || '');
      setPhone(formData.phone || '');
    } else if (currentUser) {
      // Pre-fill email if user is logged in
      setEmail(currentUser.email || '');
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ticketType || !name || !email || !phone) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }
    
    if (paymentMethod === 'pix') {
      setShowQRCode(true);
      toast.success('Pedido gerado com sucesso! Faça o pagamento para confirmar seu ingresso.');
    } else {
      // Em uma implementação completa, redirecionaria para o gateway de pagamento
      toast.info('Implementação de cartão de crédito em breve disponível!');
    }
  };
  
  // Save form data and redirect to login
  const saveFormDataAndRedirect = () => {
    const formData = {
      ticketType,
      name,
      email,
      phone
    };
    
    sessionStorage.setItem('ticketFormData', JSON.stringify(formData));
    sessionStorage.setItem('redirectAfterLogin', window.location.href + '#comprar');
    
    toast.info('Você precisa estar logado para prosseguir com o pagamento');
    setTimeout(() => {
      // Trigger the login modal by clicking the login button
      const loginButton = document.querySelector('[data-login-button="true"]') as HTMLElement;
      if (loginButton) {
        loginButton.click();
      }
    }, 1000);
  };
  
  const ticketPrice = ticketType === 'female' ? 'R$20' : ticketType === 'male' ? 'R$30' : '';

  return (
    <section id="comprar" className="py-16 container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white mb-6"
      >
        Comprar <span className="neon-blue-text">Ingresso</span>
      </motion.h2>

      <div className="glass p-6 rounded-lg">
        {!showQRCode ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Tabs defaultValue="dados" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="dados" className="text-white">
                  <Users className="w-4 h-4 mr-2" /> Dados Pessoais
                </TabsTrigger>
                <TabsTrigger value="pagamento" className="text-white">
                  <CreditCard className="w-4 h-4 mr-2" /> Pagamento
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dados">
                <form className="space-y-6">
                  <div>
                    <label className="block text-white mb-2">Tipo de Ingresso</label>
                    <Select onValueChange={(value) => setTicketType(value)} value={ticketType}>
                      <SelectTrigger className="bg-dark-gray border-light-gray text-white">
                        <SelectValue placeholder="Selecione o tipo de ingresso" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-gray text-white">
                        <SelectItem value="female">Mulher - R$20 (Antecipado)</SelectItem>
                        <SelectItem value="male">Homem - R$30 (Antecipado)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Nome Completo</label>
                    <Input 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-dark-gray border-light-gray text-white"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Email</label>
                    <Input 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="bg-dark-gray border-light-gray text-white"
                      placeholder="Seu email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Telefone (WhatsApp)</label>
                    <Input 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-dark-gray border-light-gray text-white"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  
                  <Button 
                    type="button"
                    className="w-full bg-neon-blue hover:bg-neon-blue/80 text-black font-bold"
                    onClick={() => {
                      if (!ticketType || !name || !email || !phone) {
                        toast.error('Por favor, preencha todos os campos');
                        return;
                      }
                      
                      // Check if user is logged in
                      if (!currentUser) {
                        saveFormDataAndRedirect();
                        return;
                      }
                      
                      // User is logged in, proceed to payment tab
                      const pagamentoTab = document.querySelector('[data-value="pagamento"]') as HTMLElement;
                      if (pagamentoTab) {
                        pagamentoTab.click();
                      }
                    }}
                  >
                    Continuar para Pagamento
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="pagamento">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white">Escolha o método de pagamento:</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Button 
                      variant={paymentMethod === 'pix' ? 'default' : 'outline'}
                      className={`flex items-center justify-center h-16 ${paymentMethod === 'pix' ? 'bg-neon-blue text-black' : 'border-neon-blue text-neon-blue'}`}
                      onClick={() => setPaymentMethod('pix')}
                    >
                      <QrCode className="mr-2 h-5 w-5" />
                      PIX
                    </Button>
                    
                    <Button 
                      variant={paymentMethod === 'card' ? 'default' : 'outline'}
                      className={`flex items-center justify-center h-16 ${paymentMethod === 'card' ? 'bg-neon-purple text-white' : 'border-neon-purple text-neon-purple'}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Cartão de Crédito
                    </Button>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 py-4 border-t border-gray-700">
                      <p className="text-white text-center">
                        Pagamento por cartão em breve disponível!
                      </p>
                    </div>
                  )}
                  
                  <div className="py-4 border-t border-gray-700">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Tipo de ingresso:</span>
                      <span className="text-white font-semibold">
                        {ticketType === 'female' ? 'Mulher (Antecipado)' : ticketType === 'male' ? 'Homem (Antecipado)' : ''}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Valor:</span>
                      <span className="text-neon-blue text-xl font-bold">{ticketPrice}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-gray-500 text-gray-300 hover:bg-gray-700"
                      onClick={() => {
                        const dadosTab = document.querySelector('[data-value="dados"]') as HTMLElement;
                        if (dadosTab) {
                          dadosTab.click();
                        }
                      }}
                    >
                      Voltar
                    </Button>
                    
                    <Button 
                      type="button"
                      onClick={handleSubmit}
                      className="flex-1 bg-neon-blue hover:bg-neon-blue/80 text-black font-bold"
                    >
                      Finalizar Compra
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Pagamento via PIX</h3>
              <div className="inline-block bg-neon-blue text-black px-3 py-1 rounded-full text-xs font-semibold mb-2">
                Validade: 30 minutos
              </div>
              <p className="text-gray-300 text-sm">
                Escaneie o QR Code abaixo ou copie a chave PIX para realizar o pagamento de {ticketPrice}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg mb-6 relative overflow-hidden">
              <div className="flex items-center justify-center bg-black p-2 mb-4 rounded">
                <div className="w-48 h-48 bg-white flex items-center justify-center relative">
                  {/* QR Code estático para demonstração - em produção seria um QR dinâmico */}
                  <div className="w-full h-full bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAADc3NzNzc3U1NSQkJCjo6M+Pj51dXWFhYX7+/vY2NhFRUXr6+ufn58wMDDn5+deXl5wcHDExMTu7u6/v7/19fVXV1e3t7dQUFBnZ2chISGHh4cRERGzs7OamponJyc4ODgcHBxiYmILCwt7e3saGhpJSUkZoyuUAAAJdUlEQVR4nO2d6XbiOBCFSROzmE2QgA0JJDTpef+HnN7CAVtSla7K6nNyv58j3OhKKi3VUhRdj3owbuev7/ty9e/pfLHY7c6L3W65ety/l6/z7Xgwuv6fr8r48fAwMbuSR7Ob70fJCee79WTgUuprBsP9+piOuVjcjdI48SC7RZ7Ktyobm4OEO5gtk/M9yWpRdwvuu8X60o+esenHsZXuZHckZTxwK1/rMvzNInZL6+f5He7D21PLpa9695QKnLLmGv3hCxnwQu5uzd7QfNQLAbyQ1xo5Hb08j4IR3phocNl7DIp3YbxQfl5fwxNeJO5bMc91YMJa+XmG78EYnxMTVrLeSAgrwwcmvDH2KYyTxIw7YsA/28J9alfETzLKNewtwBw2gUeOk9CVgbGdPBBDRlGUVrCyG7YidBZ09nEFe2BMTL97Dyawi+UptK+aPwK0nZSS8EluTHE6fSha5KV0zRGUrAP9ejnK3UkpA30I3sTGBrqbUuZQ0KHYS+xK0DmItDL/zt1F0FNlKZzaeYjmmAEC+O1mQTB8sa7izcdgJ0TSOIL0tLkKV6cHGkCaXjoqtbNLQqrgdJW4D/6ESJ8y1c5qJZiQzNVRmxl0OUVL5CpRVhOE02z2C5PE5NxU/DqqTOsBF6E1a3WfWEiXouwvnQUTZoYx5qGr1WkaLopgLsEHc6XqvxZsINnzaCNAVUI9Mmv1MG0MRPVg9fIIBZRsQ6ubTAMT6pSNwIBi6m5h9f41YEK9cRsHGB2tid+IPZeNPkDBQglp3EYFKJhRwN/foAkFDRHb+VU8YxzhPFvTAGVdk0B58Q+ekCNU6mTZSYhuxP8QZzefowjbSSrmTnEls9NAhMZ2HUcQQM9hxBGS15KBhMR24xY7LjXHrcV0DgEIXxkQhcKwPQxhvtZFnmPozZUSrpgQBdt01ZXSljBrP1j4jG/xXa4gODs7QhESO88KKUcKFLsnXELJekvQMyBRpRzhG3uiQDv+X5GXimdEwg9fwB6SFBxwiyivU0KEJ1fAnnGDLR8VZNc0hLuOCL/8AHvGDWPrh1Pkr6EIXb/d49wf4AV/hjeEsJc64SynUp8NVcJTN4Sf6SYpEW/kftLsrZoQnrrJ83egHGUXEdEF4R2M0MeRKtTFnISu7kuyQYoaFopGYAkB05ZV97mFNjHCB5dPR8poFCeAYAk71fQ9/50pbWgiEOL9Nmha/CdOZx2XHxTF3DSlK/g0HM02qiVMCxGCsxJHP6d8ZPNlCBE6V5lwjPBbVhEjkUCGEDZLaZF5xjMl1BWIvxrGDDOMEDV2mFpb22UT4FmVVr0i0bXhBcA9duEyrCYB9DaUF0kadtyg3fAKaGzZlC98hW2HJO/H+wCFwIRe+1C5SS1m7EwXTPGgBV7SMl3EGrgTPRxt2FX44dqAIVre91Ee8bMQ+6n1CCJcACpdziivEYMTyttt6CPHyW0JO7aFWuTIs6MvQmMwVQnlBYj+crFsV+GCELoMb6S981mQTbH1wpwG2Y2fOaEPQP6jOKGr2tY34tawR8UbDXd9QTiP6B5+BrSs+VAsTufNX3hieo/5plgjUgabk++LZUPb8p62w5o2Gd+FXvbB9wGeF+P/zbacaOWbM90Ud7js9FZyvrIt08RY353Rm5pqzkrWuJZFDw+WGUMq7cpYJ/apK/FKfwpvR+QqSnQlaaf4QBe2ZfaREorVkg7JsOwTAtgmNwpLKJjW6xTb6EMWQrHsH7YULfvmW0s3smrtEyprt0JSr9nxigWDtLZvo1DaefDNKBWwuG19Q6jIYtNtjyLltqgzQrXd9k2oLVZcFqpAVz8/i07fIYq2lgXqdI159G3Pq7mIUqfzR9WJPeXU8bcA3VS1MiOdXK9ONj7XFnBSo9PESB2rLcT3YhCj0MJNZR05TAuNVSJ2+QIcgmQI1QnU1QHDd5elQJ+rHiRL+Kb9Vz0/JCkdUcseiYEl1MdLdYJC8sOzB2Ab9VqO5OXWqr+mOsMmPTU2h+BtlGo5Mj3E+cuo63tEAKGaOiQ7eTs2lbPH6VHrfJ+kiEu01CdOpYtadprOGRYcnPozYp1OfwdM6PzUUwOdng4Y2weJZgqBnmqm1XWpFfyEp1ZqnQNS3JFl4mumrlehttKgt1L5qVOddnHBuf5EvVuXOrm0L718hhovDczcATR6aNW3t0MnDGgtFTelqFb16j9GayhazJVB9drMoNQnpPVESusYJzfQqQnBynz2ngGtsuJwbI/zVerc2uCE0aRFtVptzdk326YJtP6ndV+p+oNfMITRxN51GmrBQbDjp6KW/ti70dqARm+dqTUugk1jid6w4dDGHxt6HAqfUGrVcUNLj+L7XnM77YdWwjvxWX4bJdIebNwBGmB/rCsfWjeOXc5dN00zih+jfNoHBh1t15qbWs4PafFbHo9lNRySe32u3e7cbKXbb+kyY8u5PmCZ7TXRKfhZ9cJsXP+sa1t9VPqjYxpMKtUAD+0h2SQrpPQ2Jm9bvhaj+XZcjnrF8C7zvqaJ7+2lXG1z2oad3ZPvqcbLIt+9NxNhbi9D7Wd8eSG8Ap7HgtqUXt6OXGgLyVbZeLDM3/JzZTH9Hak+38h9T1PfHu1npyhbM/fx7izDzm5Lm3s0iCXdqez0hHweBbAz6K4t5Tzobl/7B6l3Fm8R4IRZaOVtQjZHdc9rG3O2Fug+Ktuzf32mIYwKVt937HKYxTPr+36plrJg7cb2DmBuUvF6NeUp/74rcTVS3mO3tNuiqmCQr/ye7m5FlTh7Knf+qm4r5EM7YX7a5O3RbHyL5b/qd7vwJN9Bv40zh5A5601377UdmvDiLlm4CVTt9okU0JfbzvYmFTzPv84KhAs6BD0nhr2NemjKg3SB+JYk9XYvfa75xvSJ06kk7fBd5WmepjrXHxuET4z1xpB/+cgS5+Hx1dpnHV4ga5z8niiIhpk4wENKAK/c5xA0pw9qkY/qa+JXG69jblmYFk24X6RCPJcpLtIiiCJ7SE84WIfx2uzIXOyDXA4Uz48hipgQY25jEHKroJ8QGE6mcBMiM80KFCbouLGrx90hWPEuDHerWpSwZ0Sktwo2Ltu7aVvq75AKwONfy5BzTvofG/HaeyDt+Hxtmy+zhYKwWI6DTdkmmSfeLuf3i5S+v1VO7qJWaVWrWfvxqcz6+6/vo79ZTroLn1ry+PD1VMWP5bs5305/j6/NdrSuN9lXH2b/Aabr0VfwL6+TAAAAAElFTkSuQmCC')]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <QrCode size={80} className="text-blue-500 opacity-50" />
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-black font-bold mb-1">Chave PIX:</p>
                <div className="flex items-center justify-center bg-gray-100 rounded p-2 mb-2">
                  <p className="text-gray-800 text-sm truncate mr-2">{pixKey}</p>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-6 p-0"
                    onClick={() => {
                      navigator.clipboard.writeText(pixKey);
                      toast.success('Chave PIX copiada!');
                    }}
                  >
                    Copiar
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Após o pagamento, enviaremos seu ingresso por email em até 24 horas</p>
              </div>
            </div>
            
            <div className="w-full space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded p-3 text-center">
                  <p className="text-gray-400 text-xs">Nome</p>
                  <p className="text-white truncate">{name}</p>
                </div>
                <div className="bg-gray-800 rounded p-3 text-center">
                  <p className="text-gray-400 text-xs">Ingresso</p>
                  <p className="text-white">
                    {ticketType === 'female' ? 'Mulher (Antecipado)' : 'Homem (Antecipado)'}
                  </p>
                </div>
                <div className="bg-gray-800 rounded p-3 text-center">
                  <p className="text-gray-400 text-xs">Valor</p>
                  <p className="text-neon-blue font-bold">{ticketPrice}</p>
                </div>
              </div>
              
              <Button 
                onClick={() => setShowQRCode(false)}
                variant="outline" 
                className="w-full border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white"
              >
                Voltar
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PixPayment;
