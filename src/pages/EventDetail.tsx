import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Ticket, Info, Share2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { EventType } from '@/types';
import PurchaseConfirmation from '@/components/PurchaseConfirmation';
import StaticEventFlyer from '@/components/StaticEventFlyer';
import SmallDotsPagination from '@/components/SmallDotsPagination';

// Mock data for event details
const mockEvents = [
  {
    id: "1",
    title: "ALEATÓRIOS FEST",
    subtitle: "Aleatorios Fest x Element's Fest",
    description: "Prepare-se para a maior festa do ano! O Aleatórios Fest traz uma experiência única com os melhores DJs, ambiente incrível e muita diversão. Não perca essa oportunidade de viver momentos inesquecíveis com seus amigos.",
    date: "31 de Maio, 2025",
    time: "16:00 às 00:00",
    location: "Chácara Monero, Osasco - SP",
    price: 120.00,
    image_url: "/lovable-uploads/f4ab4706-3eb6-4041-bef7-5b41bf79ede2.png",
    images: [
      "/lovable-uploads/f4ab4706-3eb6-4041-bef7-5b41bf79ede2.png",
      "/lovable-uploads/cb1194d7-2a0c-4747-a307-23c02b66b55d.png",
      "/lovable-uploads/76338d86-9bf8-4f21-9853-0af071d1c4a8.png"
    ],
    attractions: ["DJ Marky", "Chemical Surf", "Dubdogz", "Vinne"],
    ticketsAvailable: 200
  },
  {
    id: "2",
    title: "PROJETO X: Virada Eletrônica",
    subtitle: "Edição Especial",
    description: "PROJETO X: A maior festa de música eletrônica da cidade está de volta! Uma noite inteira de música, luzes e energia com os melhores DJs nacionais e internacionais. Prepare-se para uma experiência sensorial única.",
    date: "28 de Maio, 2025",
    time: "22:00 às 06:00",
    location: "Arena X, São Paulo",
    price: 150.00,
    image_url: "/lovable-uploads/cb1194d7-2a0c-4747-a307-23c02b66b55d.png",
    images: [
      "/lovable-uploads/cb1194d7-2a0c-4747-a307-23c02b66b55d.png"
    ],
    attractions: ["Alok", "Vintage Culture", "KVSH", "Bhaskar"],
    ticketsAvailable: 150
  },
  {
    id: "3",
    title: "Neon Night",
    subtitle: "Festa de Eletrônica",
    description: "Uma noite inesquecível com as melhores músicas eletrônicas, ambiente neon e muita diversão. Vista-se com cores vibrantes e venha fazer parte dessa experiência única!",
    date: "12 de Junho, 2025",
    time: "23:00 às 05:00",
    location: "Club Matrix",
    price: 89.90,
    image_url: "/lovable-uploads/76338d86-9bf8-4f21-9853-0af071d1c4a8.png",
    images: [
      "/lovable-uploads/76338d86-9bf8-4f21-9853-0af071d1c4a8.png",
      "/lovable-uploads/f4ab4706-3eb6-4041-bef7-5b41bf79ede2.png",
      "/lovable-uploads/cb1194d7-2a0c-4747-a307-23c02b66b55d.png"
    ],
    attractions: ["Liu", "Carola", "Barja", "Maz"],
    ticketsAvailable: 100
  }
];

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseComplete, setShowPurchaseComplete] = useState(false);
  const [purchasedTicket, setPurchasedTicket] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('info');
  const [activeSlide, setActiveSlide] = useState(0);
  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        const foundEvent = mockEvents.find(e => e.id === id);
        
        if (foundEvent) {
          setEvent(foundEvent);
        } else {
          toast.error('Evento não encontrado');
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        toast.error('Erro ao carregar evento');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [id, navigate]);
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 5) {
      setQuantity(newQuantity);
    }
  };
  
  const handlePurchase = () => {
    if (!user) {
      // Save current path for redirect after login
      localStorage.setItem('redirectAfterLogin', `/eventos/${id}`);
      toast.error('Faça login para comprar ingressos');
      navigate('/auth');
      return;
    }
    
    setShowPurchaseModal(true);
  };
  
  const confirmPurchase = () => {
    // In a real app, this would make an API call to process the purchase
    
    // Create a mock purchased ticket
    const ticket = {
      id: `ticket-${Date.now()}`,
      user_id: user?.id,
      event_id: event?.id,
      ticket_number: `TKT-${Math.floor(Math.random() * 10000)}`,
      status: 'valid',
      purchase_date: new Date().toISOString(),
      price: event?.price || 0,
      quantity: quantity,
      event_name: event?.title,
      event_date: event?.date,
      event_location: event?.location,
    };
    
    setPurchasedTicket(ticket);
    setShowPurchaseModal(false);
    setShowPurchaseComplete(true);
    
    toast.success('Ingresso comprado com sucesso!');
  };
  
  // Check if this is the Projeto X event
  const isProjetoX = event?.title?.toLowerCase().includes('projeto x');
  
  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-white">Evento não encontrado</h1>
          <Button 
            onClick={() => navigate('/')}
            className="mt-4 bg-neon-blue hover:bg-neon-blue/80 text-black"
          >
            Voltar para Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="pt-16">
        {/* Event Header */}
        <div className="bg-dark-gray py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{event.title}</h1>
              {event.subtitle && (
                <p className="text-xl text-neon-blue mb-4">{event.subtitle}</p>
              )}
              
              <div className="flex flex-wrap gap-4 text-gray-300">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-neon-purple" />
                  <span>{event.date}</span>
                </div>
                {event.time && (
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-neon-green" />
                    <span>{event.time}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-neon-blue" />
                  <span>{event.location}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Event Images */}
        {isProjetoX ? (
          <StaticEventFlyer 
            eventId={event.id} 
            image={event.image_url} 
            title={event.title} 
          />
        ) : (
          <div className="container mx-auto px-4 py-8">
            <Carousel
              opts={{ loop: true }}
              className="w-full max-w-3xl mx-auto"
              onSelect={(index) => setActiveSlide(index)}
            >
              <CarouselContent>
                {event.images?.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="bg-dark-gray rounded-lg overflow-hidden shadow-2xl border border-light-gray/30">
                      <img 
                        src={image} 
                        alt={`${event.title} - Imagem ${index + 1}`} 
                        className="w-full object-cover" 
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              <div className="flex items-center justify-center mt-4">
                <CarouselPrevious className="relative mr-2" />
                <SmallDotsPagination 
                  count={event.images?.length || 0} 
                  active={activeSlide} 
                />
                <CarouselNext className="relative ml-2" />
              </div>
            </Carousel>
          </div>
        )}
        
        {/* Event Details */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Event Info */}
            <div className="lg:w-2/3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info" className="text-white">Informações</TabsTrigger>
                  <TabsTrigger value="attractions" className="text-white">Atrações</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info" className="mt-6">
                  <div className="glass p-6 rounded-lg">
                    <h2 className="text-xl font-bold text-white mb-4">Sobre o Evento</h2>
                    <p className="text-gray-300 whitespace-pre-line">{event.description}</p>
                    
                    <div className="mt-6 pt-6 border-t border-light-gray/30">
                      <h3 className="text-lg font-semibold text-white mb-3">Informações Importantes</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start">
                          <Info className="mr-2 h-5 w-5 text-neon-purple shrink-0 mt-0.5" />
                          <span>Evento para maiores de 18 anos. Obrigatória apresentação de documento com foto.</span>
                        </li>
                        <li className="flex items-start">
                          <Info className="mr-2 h-5 w-5 text-neon-purple shrink-0 mt-0.5" />
                          <span>Ingressos não são reembolsáveis.</span>
                        </li>
                        <li className="flex items-start">
                          <Info className="mr-2 h-5 w-5 text-neon-purple shrink-0 mt-0.5" />
                          <span>O ingresso é pessoal e intransferível.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="attractions" className="mt-6">
                  <div className="glass p-6 rounded-lg">
                    <h2 className="text-xl font-bold text-white mb-4">Line-up</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {event.attractions?.map((attraction, index) => (
                        <div key={index} className="bg-dark-gray/50 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-neon-blue">{attraction}</h3>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right Column - Purchase */}
            <div className="lg:w-1/3">
              <div className="glass p-6 rounded-lg sticky top-20">
                <h2 className="text-xl font-bold text-white mb-4">Ingressos</h2>
                
                <div className="mb-6 pb-6 border-b border-light-gray/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Ingresso Padrão</span>
                    <span className="font-bold text-neon-green">R$ {event.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400 text-sm">Disponíveis: {event.ticketsAvailable}</span>
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleQuantityChange(-1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-dark-gray text-white hover:bg-light-gray/20"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-3 text-white">{quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-dark-gray text-white hover:bg-light-gray/20"
                        disabled={quantity >= 5}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Subtotal</span>
                    <span className="text-white">R$ {(event.price * quantity).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-300">Taxa de serviço</span>
                    <span className="text-white">R$ {(event.price * quantity * 0.1).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-neon-green">
                      R$ {(event.price * quantity * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <Button 
                  onClick={handlePurchase}
                  className="w-full bg-neon-blue hover:bg-neon-blue/80 text-black"
                >
                  <Ticket className="mr-2 h-4 w-4" />
                  Comprar Ingresso
                </Button>
                
                <div className="mt-4 flex justify-center">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Purchase Modal */}
      <Dialog open={showPurchaseModal} onOpenChange={setShowPurchaseModal}>
        <DialogContent className="bg-dark-gray text-white border border-light-gray/30 max-w-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Confirmar Compra</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-neon-blue mb-2">{event.title}</h3>
              <div className="text-gray-300 text-sm mb-1">{event.date}</div>
              <div className="text-gray-300 text-sm">{event.location}</div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-300">Ingressos ({quantity}x)</span>
                <span className="text-white">R$ {(event.price * quantity).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Taxa de serviço</span>
                <span className="text-white">R$ {(event.price * quantity * 0.1).toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-light-gray/30 flex justify-between font-bold">
                <span className="text-white">Total</span>
                <span className="text-neon-green">R$ {(event.price * quantity * 1.1).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button 
                onClick={confirmPurchase}
                className="w-full bg-neon-blue hover:bg-neon-blue/80 text-black"
              >
                Confirmar Compra
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowPurchaseModal(false)}
                className="w-full border-light-gray/30 hover:bg-light-gray/10"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Purchase Confirmation Modal */}
      <Dialog open={purchaseComplete} onOpenChange={setShowPurchaseComplete}>
        <DialogContent className="bg-dark-gray text-white border border-light-gray/30 max-w-md">
          {purchasedTicket && (
            <PurchaseConfirmation 
              ticket={purchasedTicket} 
              onClose={() => setShowPurchaseComplete(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default EventDetail;
