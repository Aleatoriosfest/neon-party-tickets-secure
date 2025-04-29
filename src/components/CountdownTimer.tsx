
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="py-10 container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white mb-6"
      >
        Contagem <span className="neon-text">Regressiva</span>
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="glass p-8 rounded-lg flex flex-wrap justify-center"
      >
        <div className="countdown-item">
          <div className="countdown-value neon-border bg-black/50 w-24 h-24 rounded-lg flex items-center justify-center text-4xl font-bold neon-text mb-2">
            {timeLeft.days}
          </div>
          <div className="countdown-label text-center text-white">Dias</div>
        </div>
        
        <div className="countdown-item mx-4">
          <div className="countdown-value neon-border bg-black/50 w-24 h-24 rounded-lg flex items-center justify-center text-4xl font-bold neon-text mb-2">
            {timeLeft.hours}
          </div>
          <div className="countdown-label text-center text-white">Horas</div>
        </div>
        
        <div className="countdown-item mr-4">
          <div className="countdown-value neon-border bg-black/50 w-24 h-24 rounded-lg flex items-center justify-center text-4xl font-bold neon-text mb-2">
            {timeLeft.minutes}
          </div>
          <div className="countdown-label text-center text-white">Minutos</div>
        </div>
        
        <div className="countdown-item">
          <div className="countdown-value neon-border bg-black/50 w-24 h-24 rounded-lg flex items-center justify-center text-4xl font-bold neon-text mb-2">
            {timeLeft.seconds}
          </div>
          <div className="countdown-label text-center text-white">Segundos</div>
        </div>
      </motion.div>
    </div>
  );
};

export default CountdownTimer;
