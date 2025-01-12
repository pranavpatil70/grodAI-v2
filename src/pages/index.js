import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';

export default function Home() {
  return (
    <main className="bg-gray-900">
      <HeroSection />
      <FeaturesSection />
    </main>
  );
} 