import MainLayout from '@/layouts/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TrendingSection from '@/components/home/TrendingSection';

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedProducts />
      <TrendingSection />
    </MainLayout>
  );
} 