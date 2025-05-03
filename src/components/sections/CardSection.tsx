import React, { useRef } from "react";
import { motion } from "framer-motion";
import { CardSectionProps } from "../../interfaces/cards.interface";
import Cards from "../Cards";
import Title from "../Title";

const CardSection: React.FC<CardSectionProps> = ({ title, cards }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-[#f6f7f9] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title title={title} size="lg" weight="bold" />
        </motion.div>
        
        <div className="relative">
          {/* Navigation controls for larger screens */}
          <div className="hidden md:flex justify-between absolute top-1/2 transform -translate-y-1/2 w-full px-4 z-10 pointer-events-none">
            <motion.button 
              className="bg-white shadow-md rounded-full p-3 text-blue-600 hover:bg-blue-50 transition-all pointer-events-auto focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              aria-label="Scroll left"
              onClick={scrollLeft}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </motion.button>
            <motion.button 
              className="bg-white shadow-md rounded-full p-3 text-blue-600 hover:bg-blue-50 transition-all pointer-events-auto focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              aria-label="Scroll right"
              onClick={scrollRight}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </motion.button>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div 
              ref={containerRef}
              id="cards-container"
              className="overflow-x-auto pb-8 scrollbar-hide flex gap-6 snap-x snap-mandatory scroll-smooth"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {cards.map((card, index) => (
                <motion.div 
                  key={card.id} 
                  className="snap-start flex-shrink-0 w-80 sm:w-80 md:w-96"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.2 + (index * 0.1),
                    ease: "easeOut"
                  }}
                  whileHover={{ y: -5 }}
                >
                  <Cards 
                    {...card} 
                    className="h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-xl bg-white" 
                  />
                </motion.div>
              ))}
              
              <motion.div 
                className="snap-start flex-shrink-0 w-80 sm:w-80 md:w-96 flex items-center justify-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.2 + (cards.length * 0.1),
                  ease: "easeOut"
                }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="h-full w-full flex flex-col items-center justify-center p-8 border border-gray-200 border-dashed rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </motion.div>
                  <p className="font-medium text-gray-700">Ver todos los artículos</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {cards.map((_, index) => (
              <motion.button 
                key={index}
                className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${index + 1}`}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.8 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.05), duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSection;