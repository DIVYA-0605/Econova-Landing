import dynamic from 'next/dynamic';
import { Section } from '@/types';

// Dynamically import sections for better performance
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'));
const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection'));
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'));
const ProductShowcaseSection = dynamic(() => import('@/components/sections/ProductShowcaseSection'));
const CTASection = dynamic(() => import('@/components/sections/CTASection'));

interface DynamicSectionProps {
  section: Section;
}

export default function DynamicSection({ section }: DynamicSectionProps) {
  switch (section.__typename) {
    case 'HeroSection':
      return <HeroSection hero={section} />;
    
    case 'FeaturesSection':
      return <FeaturesSection features={section} />;
    
    case 'TestimonialsSection':
      return <TestimonialsSection testimonials={section} />;
    
    case 'ProductShowcaseSection':
      return <ProductShowcaseSection showcase={section} />;
    
    case 'CtaSection':
      return <CTASection cta={section} />;
    
    default:
      console.warn(`Unknown section type: ${(section as any).__typename}`);
      return null;
  }
}
