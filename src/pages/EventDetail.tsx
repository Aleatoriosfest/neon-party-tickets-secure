
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import EventBannerSlider from '@/components/EventBannerSlider';
import EventHighlights from '@/components/EventHighlights';
import ArtistSection from '@/components/ArtistSection';
import LocationSection from '@/components/LocationSection';
import PhotoGallery from '@/components/PhotoGallery';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import CountdownTimer from '@/components/CountdownTimer';
import ArtistTimeline from '@/components/ArtistTimeline';
import FAQSection from '@/components/FAQSection';
import SocialShare from '@/components/SocialShare';
import PixPayment from '@/components/PixPayment';
import PurchaseTicketModal from '@/components/PurchaseTicketModal';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

// Mock data - in a real app this would come from a database based on the event ID
const events = {
  "1": {
    title: "ALEATÓRIOS FEST",
    subtitle: "Aleatorios Fest x Element's Fest",
    date: "31 de Maio, 2025",
    time: "16:00 às 00:00",
    location: "Chácara Monero, Osasco - SP",
    image: "/lovable-uploads/7167fe07-a100-48a7-9d4e-ef3e91237dd1.png",
    highlights: [
      "Open Bar",
      "Carros de Som e Paredão",
      "Sorteio de Combos e Camisetas",
      "Venda de Bebidas no Local",
      "Mulher: R$20 (ingresso antecipado)",
      "Homem: R$30 (ingresso antecipado)",
      "Na porta: R$50 (para todos)"
    ],
    artists: [
      {
        name: "DJ Buzato",
        role: "DJ",
        image: "/lovable-uploads/9261fd76-402b-4aee-b73b-fcaf4f396c03.png",
        description: "Atração Confirmada"
      },
      {
        name: "Tio Reh",
        role: "O Brabo do Passinho",
        image: "/lovable-uploads/0fa98cf1-cff5-49fd-8709-5417fc6838a9.png",
        description: "Atração Confirmada"
      },
      {
        name: "DJ EZ Da Z/O",
        role: "O Mago",
        image: "/lovable-uploads/9bb4eefd-69a5-4c24-8703-d7d7827455fb.png",
        description: "Atração Confirmada" 
      },
      {
        name: "DJ Luís ZL",
        role: "DJ",
        image: "/lovable-uploads/f4ab4706-3eb6-4041-bef7-5b41bf79ede2.png",
        description: "Atração Confirmada"
      },
      {
        name: "DJ Arthur ZL",
        role: "Tá Tocando pras Gustosa",
        image: "/lovable-uploads/cb1194d7-2a0c-4747-a307-23c02b66b55d.png",
        description: "Ritmo dos Fluxos"
      },
      {
        name: "DJ Pereira 011",
        role: "Trem Bala",
        image: "/lovable-uploads/cc64f665-9293-4b72-b9ec-0e086767e5d8.png",
        description: "Da Putaria" 
      },
      {
        name: "Tequileira Branquinha",
        role: "Show",
        image: "/lovable-uploads/66e7124c-142d-48aa-804a-bc0dd6b9cb6b.png",
        description: "Atração Confirmada"
      }
    ],
    venuePhotos: [
      "/lovable-uploads/9b5040f4-3d9b-431b-9528-0a6e0552d820.png",
      "/lovable-uploads/1f4c116a-2467-4107-97a1-4b397d9ca8dd.png",
      "/lovable-uploads/27f85bf7-0910-4968-8bbd-70116f2445b4.png",
      "/lovable-uploads/fdb76549-81d9-4887-ac8f-2601d25c76ff.png",
      "/lovable-uploads/870304d1-530e-4ea0-87f8-4289cf656d78.png",
      "/lovable-uploads/31f8a26d-bdbb-4ba8-8e99-6774edc2d5be.png",
      "/lovable-uploads/4bf3e74e-28e6-4abe-a119-ab22358af8bf.png"
    ],
    targetDate: "2025-05-31T16:00:00",
    venueName: "Chácara Monero",
    venueAddress: "Estrada das Margaridas, 209 - Recanto das Rosas, Osasco - SP",
    instagramUrls: [
      "https://www.instagram.com/aleatorios_fest?igsh=Nnl0aTE0MzZyMXQ5",
      "https://www.instagram.com/elementsfest1?igsh=M2Q4MDJvODNncHhl"
    ]
  },
  "2": {
    title: "Element's Fest",
    subtitle: "Edição Especial",
    date: "15 de Junho, 2025",
    time: "18:00 às 02:00",
    location: "Arena XYZ, São Paulo - SP",
    image: "/lovable-uploads/f47b2c1d-b605-469f-a0e1-ea3d73c3ef25.png",
    highlights: [
      "Open Bar Premium",
      "DJs Internacionais",
      "Área VIP",
      "Experiência audiovisual única",
      "Ingresso comum: R$60",
      "Ingresso VIP: R$120"
    ],
    artists: [
      {
        name: "DJ Buzato",
        role: "DJ",
        image: "/lovable-uploads/9261fd76-402b-4aee-b73b-fcaf4f396c03.png",
        description: "Atração Confirmada"
      },
      {
        name: "Tio Reh",
        role: "O Brabo do Passinho",
        image: "/lovable-uploads/0fa98cf1-cff5-49fd-8709-5417fc6838a9.png",
        description: "Atração Confirmada"
      }
    ],
    venuePhotos: [
      "/lovable-uploads/9b5040f4-3d9b-431b-9528-0a6e0552d820.png",
      "/lovable-uploads/1f4c116a-2467-4107-97a1-4b397d9ca8dd.png",
      "/lovable-uploads/27f85bf7-0910-4968-8bbd-70116f2445b4.png"
    ],
    targetDate: "2025-06-15T18:00:00",
    venueName: "Arena XYZ",
    venueAddress: "Av. Principal, 1000 - Centro, São Paulo - SP",
    instagramUrls: [
      "https://www.instagram.com/elementsfest1?igsh=M2Q4MDJvODNncHhl"
    ]
  },
  "3": {
    title: "Projeto X",
    subtitle: "A festa mais louca do ano",
    date: "20 de Julho, 2025",
    time: "21:00 às 05:00",
    location: "Casa de Eventos ABC, Santo André - SP",
    image: "/lovable-uploads/de50cc19-19d3-44a1-bf48-7a14dcc3a803.png",
    highlights: [
      "Open Bar de Cerveja",
      "2 Pistas",
      "Line-up Exclusivo",
      "Ingresso único: R$40"
    ],
    artists: [
      {
        name: "DJ Arthur ZL",
        role: "Tá Tocando pras Gustosa",
        image: "/lovable-uploads/cb1194d7-2a0c-4747-a307-23c02b66b55d.png",
        description: "Ritmo dos Fluxos"
      },
      {
        name: "DJ Pereira 011",
        role: "Trem Bala",
        image: "/lovable-uploads/cc64f665-9293-4b72-b9ec-0e086767e5d8.png",
        description: "Da Putaria" 
      }
    ],
    venuePhotos: [
      "/lovable-uploads/870304d1-530e-4ea0-87f8-4289cf656d78.png",
      "/lovable-uploads/31f8a26d-bdbb-4ba8-8e99-6774edc2d5be.png",
      "/lovable-uploads/4bf3e74e-28e6-4abe-a119-ab22358af8bf.png"
    ],
    targetDate: "2025-07-20T21:00:00",
    venueName: "Casa de Eventos ABC",
    venueAddress: "Rua das Festas, 500 - Centro, Santo André - SP",
    instagramUrls: [
      "https://www.instagram.com/projetox?igsh=example"
    ]
  },
  "4": {
    title: "Open Bar Night",
    subtitle: "Noite Inesquecível",
    date: "5 de Agosto, 2025",
    time: "22:00 às 06:00",
    location: "Club 123, São Paulo - SP",
    image: "/lovable-uploads/42202d9f-6a6a-4541-b446-225cbc122a53.png",
    highlights: [
      "Open Bar Completo",
      "Música Eletrônica",
      "Go-go dancers",
      "Ingressos limitados: R$80"
    ],
    artists: [
      {
        name: "DJ EZ Da Z/O",
        role: "O Mago",
        image: "/lovable-uploads/9bb4eefd-69a5-4c24-8703-d7d7827455fb.png",
        description: "Atração Confirmada" 
      },
      {
        name: "DJ Luís ZL",
        role: "DJ",
        image: "/lovable-uploads/f4ab4706-3eb6-4041-bef7-5b41bf79ede2.png",
        description: "Atração Confirmada"
      }
    ],
    venuePhotos: [
      "/lovable-uploads/870304d1-530e-4ea0-87f8-4289cf656d78.png",
      "/lovable-uploads/31f8a26d-bdbb-4ba8-8e99-6774edc2d5be.png"
    ],
    targetDate: "2025-08-05T22:00:00",
    venueName: "Club 123",
    venueAddress: "Alameda das Baladas, 123 - Vila Mariana, São Paulo - SP",
    instagramUrls: [
      "https://www.instagram.com/openbarnight?igsh=example"
    ]
  }
};

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  
  useEffect(() => {
    if (id && events[id as keyof typeof events]) {
      setEvent(events[id as keyof typeof events]);
    } else {
      // Event not found, redirect to catalog
      navigate('/eventos');
    }
  }, [id, navigate]);
  
  const handleBuyTicket = () => {
    if (!user) {
      // Store the intended destination
      localStorage.setItem('redirectAfterLogin', `/eventos/${id}`);
      toast.info('Faça login para comprar ingressos');
      navigate('/auth');
      return;
    }
    
    setShowPurchaseModal(true);
  };
  
  if (!event) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
      </div>
    );
  }
  
  const artistImages = event.artists.map((artist: any) => artist.image);
  
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="pt-16 container mx-auto px-4">
        <Button 
          onClick={() => navigate(-1)} 
          variant="outline" 
          className="mb-4 text-white border-light-gray hover:bg-neon-blue/20 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Voltar para eventos
        </Button>
      </div>
      
      {/* Banner Hero com Slides */}
      <section className="pb-8">
        <EventBannerSlider 
          title={event.title}
          subtitle={event.subtitle}
          date={event.date}
          time={event.time}
          location={event.location}
          flyer={event.image}
          artistImages={artistImages}
          venueImages={event.venuePhotos}
        />
      </section>
      
      {/* Countdown Timer */}
      <CountdownTimer targetDate={event.targetDate} />
      
      {/* Botão de compra após o countdown */}
      <div className="container mx-auto px-4 py-6 text-center">
        <Button 
          onClick={handleBuyTicket}
          className="bg-neon-blue hover:bg-neon-blue/80 text-black font-bold text-lg px-8 py-6"
          size="lg"
        >
          COMPRAR INGRESSO
        </Button>
      </div>
      
      {/* Event Highlights */}
      <EventHighlights highlights={event.highlights} />
      
      {/* Artists */}
      <ArtistSection artists={event.artists} />
      
      {/* Artist Timeline */}
      <ArtistTimeline />
      
      {/* Pagamento via PIX */}
      <PixPayment />
      
      {/* Local Info */}
      <LocationSection 
        name={event.venueName} 
        address={event.venueAddress}
      />
      
      {/* Photo Gallery */}
      <section className="py-10 container mx-auto px-4">
        <PhotoGallery photos={event.venuePhotos} title="Fotos do Local" />
      </section>
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Social Share */}
      <SocialShare instagramUrls={event.instagramUrls} />
      
      {/* CTA Section with Buy Ticket Button */}
      <section className="py-16 bg-gradient-to-br from-dark to-dark-gray">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Garanta seu lugar nesse evento!</h2>
          <Button 
            onClick={handleBuyTicket}
            className="bg-neon-blue hover:bg-neon-blue/80 text-black font-bold text-lg px-8 py-6"
            size="lg"
          >
            COMPRAR AGORA
          </Button>
        </div>
      </section>
      
      {/* Purchase Modal */}
      <PurchaseTicketModal 
        isOpen={showPurchaseModal} 
        onClose={() => setShowPurchaseModal(false)} 
        event={event}
      />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EventDetail;
