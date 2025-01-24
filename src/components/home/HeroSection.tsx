import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/hero-image.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: scrollY * 0.5
        }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Discover Trending Style
          </h1>
          <p className="text-xl mb-8">
            Shop the latest fashion trends with our curated collection
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-full 
                           hover:bg-gray-100 transition-colors duration-300">
            Shop Now
          </button>
        </motion.div>
      </div>
    </section>
  );
} 