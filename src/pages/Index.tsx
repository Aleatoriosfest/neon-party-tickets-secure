
import React from 'react';
import Navbar from '@/components/Navbar';
import EventBanner from '@/components/EventBanner';
import EventHighlights from '@/components/EventHighlights';
import ArtistSection from '@/components/ArtistSection';
import LocationSection from '@/components/LocationSection';
import PhotoGallery from '@/components/PhotoGallery';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  const featuredEvent = {
    title: "PROJETO X",
    subtitle: "Aleatorios Fest x Element's Fest",
    date: "31 de Maio, 2025",
    time: "16:00 às 00:00",
    location: "Chácara Monero, Osasco - SP",
    image: "public/lovable-uploads/7167fe07-a100-48a7-9d4e-ef3e91237dd1.png"
  };
  
  const eventHighlights = [
    "Open Bar",
    "Carros de Som e Paredão",
    "Sorteio de Combos e Camisetas",
    "Venda de Bebidas no Local",
    "Mulher: R$20 (com nome na lista)",
    "Homem: R$30 (com nome na lista)",
    "Homem: R$50 (sem nome na lista)"
  ];
  
  const artists = [
    {
      name: "DJ Buzato",
      role: "DJ",
      image: "public/lovable-uploads/9261fd76-402b-4aee-b73b-fcaf4f396c03.png",
      description: "Atração Confirmada"
    },
    {
      name: "Tio Reh",
      role: "O Brabo do Passinho",
      image: "public/lovable-uploads/0fa98cf1-cff5-49fd-8709-5417fc6838a9.png",
      description: "Atração Confirmada"
    },
    {
      name: "DJ EZ Da Z/O",
      role: "O Mago",
      image: "public/lovable-uploads/9bb4eefd-69a5-4c24-8703-d7d7827455fb.png",
      description: "Atração Confirmada" 
    },
    {
      name: "DJ Luís ZL",
      role: "DJ",
      image: "public/lovable-uploads/f4ab4706-3eb6-4041-bef7-5b41bf79ede2.png",
      description: "Atração Confirmada"
    },
    {
      name: "DJ Arthur ZL",
      role: "Tá Tocando pras Gustosa",
      image: "public/lovable-uploads/cb1194d7-2a0c-4747-a307-23c02b66b55d.png",
      description: "Ritmo dos Fluxos"
    },
    {
      name: "DJ Pereira 011",
      role: "Trem Bala",
      image: "public/lovable-uploads/cc64f665-9293-4b72-b9ec-0e086767e5d8.png",
      description: "Da Putaria" 
    },
    {
      name: "Tequileira Branquinha",
      role: "Show",
      image: "public/lovable-uploads/66e7124c-142d-48aa-804a-bc0dd6b9cb6b.png",
      description: "Atração Confirmada"
    }
  ];
  
  const venuePhotos = [
    "public/lovable-uploads/9b5040f4-3d9b-431b-9528-0a6e0552d820.png",
    "public/lovable-uploads/1f4c116a-2467-4107-97a1-4b397d9ca8dd.png",
    "public/lovable-uploads/27f85bf7-0910-4968-8bbd-70116f2445b4.png",
    "public/lovable-uploads/fdb76549-81d9-4887-ac8f-2601d25c76ff.png",
    "public/lovable-uploads/870304d1-530e-4ea0-87f8-4289cf656d78.png",
    "public/lovable-uploads/31f8a26d-bdbb-4ba8-8e99-6774edc2d5be.png",
    "public/lovable-uploads/4bf3e74e-28e6-4abe-a119-ab22358af8bf.png"
  ];
  
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      {/* Banner Hero */}
      <section className="pt-16">
        <EventBanner {...featuredEvent} />
      </section>
      
      {/* Event Highlights */}
      <EventHighlights highlights={eventHighlights} />
      
      {/* Artists */}
      <ArtistSection artists={artists} />
      
      {/* Local Info */}
      <LocationSection 
        name="Chácara Monero" 
        address="Estrada das Margaridas, 209 - Recanto das Rosas, Osasco - SP"
      />
      
      {/* Photo Gallery */}
      <section className="py-10 container mx-auto px-4">
        <PhotoGallery photos={venuePhotos} title="Fotos do Local" />
      </section>
      
      {/* CTA Section */}
      <CTASection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
