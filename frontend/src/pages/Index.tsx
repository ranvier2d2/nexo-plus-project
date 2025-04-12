import Hero from '@/components/Hero';
import Features from '@/components/Features';
import About from '@/components/About';
import Contact from '@/components/Contact';
import React from 'react';

const Index = () => {
  return (
    <React.Fragment>
      <Hero />
      <Features />
      <About />
      <Contact />
    </React.Fragment>
  );
};

export default Index;
