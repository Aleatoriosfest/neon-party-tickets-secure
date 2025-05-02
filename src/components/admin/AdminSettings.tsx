
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, Save, Image, Mail, Phone, Globe, Shield, CreditCard } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [generalSettings, setGeneralSettings] = useState({
    festivalName: 'ALEATÓRIOS FEST',
    contactEmail: 'contato@aleatoriosfest.com.br',
    contactPhone: '+55 (11) 99999-9999',
    websiteUrl: 'aleatoriosfest.com.br',
    logoUrl: '/lovable-uploads/7167fe07-a100-48a7-9d4e-ef3e91237dd1.png'
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailPurchaseConfirmation: true,
    emailEventReminder: true,
    smsEventReminder: false,
    adminNewSaleAlert: true,
    userAccountCreation: true
  });
  
  const [paymentSettings, setPaymentSettings] = useState({
    acceptPixPayments: true,
    acceptCreditCard: false,
    pixKey: 'contato@aleatoriosfest.com.br',
    taxRate: '5',
    limitPerEmail: '5'
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    privacyPolicyText: 'A política de privacidade do ALEATÓRIOS FEST estabelece como coletamos e utilizamos seus dados pessoais para oferecer uma experiência segura e personalizada. Coletamos apenas as informações necessárias para processar compras, enviar confirmações e fornecer suporte. Seus dados não são vendidos a terceiros e você pode solicitar a exclusão a qualquer momento entrando em contato conosco.',
    termsOfServiceText: 'Ao utilizar nosso serviço, você concorda com estes termos. Os ingressos são válidos apenas para a data e evento especificados. Não realizamos reembolsos, apenas transferências de ingressos em casos específicos. A entrada no evento está sujeita à verificação de identidade. Comportamentos inadequados resultarão em expulsão sem reembolso. Nos reservamos o direito de alterar a programação se necessário.'
  });
  
  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({ 
      ...prev, 
      [setting]: !prev[setting] 
    }));
  };
  
  const handlePaymentSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePrivacyTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPrivacySettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentToggle = (setting: keyof typeof paymentSettings) => {
    if (typeof paymentSettings[setting] === 'boolean') {
      setPaymentSettings(prev => ({ 
        ...prev, 
        [setting]: !prev[setting] 
      }));
    }
  };
  
  const handleSaveSettings = (settingType: string) => {
    // In a real app, this would send the settings to a backend API
    toast.success(`Configurações de ${settingType} salvas com sucesso!`);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Configurações do Sistema</h2>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="privacy">Privacidade</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card className="bg-dark-gray border-light-gray/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="mr-2 text-neon-blue" size={20} /> Configurações Gerais
              </CardTitle>
              <CardDescription className="text-gray-400">
                Defina as informações básicas do evento e opções de contato.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="festivalName" className="text-white">Nome do Festival</Label>
                  <Input
                    id="festivalName"
                    name="festivalName"
                    value={generalSettings.festivalName}
                    onChange={handleGeneralSettingsChange}
                    className="bg-dark-gray text-white border-light-gray/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logoUrl" className="text-white">URL do Logotipo</Label>
                  <div className="relative">
                    <Input
                      id="logoUrl"
                      name="logoUrl"
                      value={generalSettings.logoUrl}
                      onChange={handleGeneralSettingsChange}
                      className="bg-dark-gray text-white border-light-gray/30 pl-10"
                    />
                    <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-white">Email de Contato</Label>
                  <div className="relative">
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      value={generalSettings.contactEmail}
                      onChange={handleGeneralSettingsChange}
                      className="bg-dark-gray text-white border-light-gray/30 pl-10"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="text-white">Telefone de Contato</Label>
                  <div className="relative">
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      value={generalSettings.contactPhone}
                      onChange={handleGeneralSettingsChange}
                      className="bg-dark-gray text-white border-light-gray/30 pl-10"
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="websiteUrl" className="text-white">Site</Label>
                  <div className="relative">
                    <Input
                      id="websiteUrl"
                      name="websiteUrl"
                      value={generalSettings.websiteUrl}
                      onChange={handleGeneralSettingsChange}
                      className="bg-dark-gray text-white border-light-gray/30 pl-10"
                    />
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button 
                  onClick={() => handleSaveSettings('gerais')}
                  className="bg-neon-blue hover:bg-neon-blue/80 text-black"
                >
                  <Save size={16} className="mr-2" /> Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="bg-dark-gray border-light-gray/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Mail className="mr-2 text-neon-purple" size={20} /> Configurações de Notificações
              </CardTitle>
              <CardDescription className="text-gray-400">
                Configure quais notificações são enviadas aos usuários e administradores.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white">Email de Confirmação de Compra</h4>
                    <p className="text-sm text-gray-400">Enviar email quando um usuário comprar um ingresso</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailPurchaseConfirmation}
                    onCheckedChange={() => handleNotificationToggle('emailPurchaseConfirmation')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white">Email de Lembrete de Evento</h4>
                    <p className="text-sm text-gray-400">Enviar lembrete 24h antes do evento</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailEventReminder}
                    onCheckedChange={() => handleNotificationToggle('emailEventReminder')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white">SMS de Lembrete de Evento</h4>
                    <p className="text-sm text-gray-400">Enviar SMS 2h antes do evento</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.smsEventReminder}
                    onCheckedChange={() => handleNotificationToggle('smsEventReminder')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white">Alerta de Nova Venda para Admin</h4>
                    <p className="text-sm text-gray-400">Notificar administradores sobre novas vendas</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.adminNewSaleAlert}
                    onCheckedChange={() => handleNotificationToggle('adminNewSaleAlert')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white">Notificação de Criação de Conta</h4>
                    <p className="text-sm text-gray-400">Enviar boas-vindas quando um usuário criar conta</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.userAccountCreation}
                    onCheckedChange={() => handleNotificationToggle('userAccountCreation')}
                  />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button 
                  onClick={() => handleSaveSettings('notificações')}
                  className="bg-neon-purple hover:bg-neon-purple/80 text-white"
                >
                  <Save size={16} className="mr-2" /> Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments">
          <Card className="bg-dark-gray border-light-gray/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CreditCard className="mr-2 text-neon-blue" size={20} /> Configurações de Pagamento
              </CardTitle>
              <CardDescription className="text-gray-400">
                Configure os métodos de pagamento e regras para venda de ingressos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white">Aceitar Pagamentos via PIX</h4>
                    <p className="text-sm text-gray-400">Permitir pagamentos por PIX</p>
                  </div>
                  <Switch 
                    checked={paymentSettings.acceptPixPayments as boolean}
                    onCheckedChange={() => handlePaymentToggle('acceptPixPayments')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white">Aceitar Cartão de Crédito</h4>
                    <p className="text-sm text-gray-400">Permitir pagamentos com cartão (requer gateway de pagamento)</p>
                  </div>
                  <Switch 
                    checked={paymentSettings.acceptCreditCard as boolean}
                    onCheckedChange={() => handlePaymentToggle('acceptCreditCard')}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="pixKey" className="text-white">Chave PIX</Label>
                  <Input
                    id="pixKey"
                    name="pixKey"
                    value={paymentSettings.pixKey}
                    onChange={handlePaymentSettingsChange}
                    className="bg-dark-gray text-white border-light-gray/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="taxRate" className="text-white">Taxa de Serviço (%)</Label>
                  <Input
                    id="taxRate"
                    name="taxRate"
                    value={paymentSettings.taxRate}
                    onChange={handlePaymentSettingsChange}
                    className="bg-dark-gray text-white border-light-gray/30"
                    type="number"
                    min="0"
                    max="100"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="limitPerEmail" className="text-white">Limite de Ingressos por Email</Label>
                  <Input
                    id="limitPerEmail"
                    name="limitPerEmail"
                    value={paymentSettings.limitPerEmail}
                    onChange={handlePaymentSettingsChange}
                    className="bg-dark-gray text-white border-light-gray/30"
                    type="number"
                    min="1"
                  />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button 
                  onClick={() => handleSaveSettings('pagamento')}
                  className="bg-neon-blue hover:bg-neon-blue/80 text-black"
                >
                  <Save size={16} className="mr-2" /> Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card className="bg-dark-gray border-light-gray/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="mr-2 text-neon-purple" size={20} /> Configurações de Privacidade
              </CardTitle>
              <CardDescription className="text-gray-400">
                Configure a política de privacidade e termos de uso do site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="privacyPolicyText" className="text-white">Política de Privacidade</Label>
                  <Textarea
                    id="privacyPolicyText"
                    name="privacyPolicyText"
                    value={privacySettings.privacyPolicyText}
                    onChange={handlePrivacyTextChange}
                    className="bg-dark-gray text-white border-light-gray/30 min-h-32"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="termsOfServiceText" className="text-white">Termos de Uso</Label>
                  <Textarea
                    id="termsOfServiceText"
                    name="termsOfServiceText"
                    value={privacySettings.termsOfServiceText}
                    onChange={handlePrivacyTextChange}
                    className="bg-dark-gray text-white border-light-gray/30 min-h-32"
                  />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button 
                  onClick={() => handleSaveSettings('privacidade')}
                  className="bg-neon-purple hover:bg-neon-purple/80 text-white"
                >
                  <Save size={16} className="mr-2" /> Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
