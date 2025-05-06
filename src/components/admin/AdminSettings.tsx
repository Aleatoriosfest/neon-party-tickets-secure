
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Save, Mail, Globe, Bell, CheckCircle } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Configurações salvas com sucesso!");
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Configurações</h2>
      
      <form onSubmit={handleSaveSettings}>
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-dark-gray border-light-gray text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="text-neon-blue" />
                Configurações de Site
              </CardTitle>
              <CardDescription className="text-gray-400">
                Personalize as configurações gerais do site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Nome do Site</Label>
                  <Input 
                    id="site-name" 
                    defaultValue="Aleatórios Fest" 
                    className="bg-dark-gray border-gray-700" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-url">URL do Site</Label>
                  <Input 
                    id="site-url" 
                    defaultValue="https://aleatoriosfest.com" 
                    className="bg-dark-gray border-gray-700" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site-description">Descrição</Label>
                <Textarea 
                  id="site-description" 
                  defaultValue="Festival de música e cultura com os melhores DJs e atrações." 
                  className="bg-dark-gray border-gray-700" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site-keywords">Palavras-chave (SEO)</Label>
                <Input 
                  id="site-keywords" 
                  defaultValue="festival, música, eletrônica, festa, DJ, São Paulo" 
                  className="bg-dark-gray border-gray-700" 
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-gray border-light-gray text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="text-neon-purple" />
                Configurações de Email
              </CardTitle>
              <CardDescription className="text-gray-400">
                Configure as notificações por email e mensagens do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email-from">Email de Envio</Label>
                  <Input 
                    id="email-from" 
                    defaultValue="contato@aleatoriosfest.com" 
                    className="bg-dark-gray border-gray-700" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-reply-to">Email para Resposta</Label>
                  <Input 
                    id="email-reply-to" 
                    defaultValue="suporte@aleatoriosfest.com" 
                    className="bg-dark-gray border-gray-700" 
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-on-purchase">Email após compra</Label>
                    <p className="text-xs text-gray-400">
                      Enviar confirmação por email após a compra de ingresso
                    </p>
                  </div>
                  <Switch id="email-on-purchase" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-on-event">Lembrete de evento</Label>
                    <p className="text-xs text-gray-400">
                      Enviar lembrete 24h antes do evento
                    </p>
                  </div>
                  <Switch id="email-on-event" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-marketing">Emails de marketing</Label>
                    <p className="text-xs text-gray-400">
                      Enviar promoções e novidades para os usuários
                    </p>
                  </div>
                  <Switch id="email-marketing" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email-signature">Assinatura de Email</Label>
                <Textarea 
                  id="email-signature" 
                  defaultValue="Equipe Aleatórios Fest | Tel: (11) 99999-9999 | contato@aleatoriosfest.com" 
                  className="bg-dark-gray border-gray-700" 
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-gray border-light-gray text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="text-neon-green" />
                Notificações do Sistema
              </CardTitle>
              <CardDescription className="text-gray-400">
                Configure as notificações internas e alertas do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-new-user">Novos usuários</Label>
                    <p className="text-xs text-gray-400">
                      Receber notificação quando um novo usuário se registrar
                    </p>
                  </div>
                  <Switch id="notify-new-user" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-purchase">Novas compras</Label>
                    <p className="text-xs text-gray-400">
                      Receber notificação para cada nova compra de ingresso
                    </p>
                  </div>
                  <Switch id="notify-purchase" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="event-reminder">Lembrete de eventos</Label>
                    <p className="text-xs text-gray-400">
                      Receber notificação antes de eventos agendados
                    </p>
                  </div>
                  <Switch id="event-reminder" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="admin-login">Logins de administradores</Label>
                    <p className="text-xs text-gray-400">
                      Notificar quando outros administradores fizerem login
                    </p>
                  </div>
                  <Switch id="admin-login" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <Save className="mr-2 h-4 w-4" />
              Salvar Configurações
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
