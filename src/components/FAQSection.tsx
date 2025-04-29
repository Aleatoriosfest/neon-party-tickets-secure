
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const faqs: FAQItem[] = [
    {
      question: 'Qual é a idade mínima para entrar no evento?',
      answer: 'A idade mínima para participar do evento é de 18 anos. Será necessário apresentar documento oficial com foto na entrada.'
    },
    {
      question: 'O que está incluso no valor do ingresso?',
      answer: 'O ingresso dá direito ao acesso ao evento e open bar. Confira nos destaques do evento os itens inclusos no open bar.'
    },
    {
      question: 'Como faço para colocar meu nome na lista?',
      answer: 'Para colocar seu nome na lista, entre em contato com um dos organizadores ou envie mensagem para o Instagram oficial do evento (@aleatorios_fest).'
    },
    {
      question: 'Haverá estacionamento no local?',
      answer: 'Sim, o local disponibiliza estacionamento com vagas limitadas. Recomendamos chegar cedo para garantir seu lugar.'
    },
    {
      question: 'É permitido entrar com comida ou bebida?',
      answer: 'Não é permitido entrar com alimentos ou bebidas externos. O evento conta com open bar e venda de bebidas adicionais no local.'
    }
  ];
  
  return (
    <section className="py-16 container mx-auto px-4">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white mb-6"
      >
        Perguntas <span className="neon-text">Frequentes</span>
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass p-6 rounded-lg"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={`faq-${index}`} value={`item-${index}`} className="border-b border-light-gray">
              <AccordionTrigger className="text-white hover:text-neon-blue transition-colors py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
};

export default FAQSection;
