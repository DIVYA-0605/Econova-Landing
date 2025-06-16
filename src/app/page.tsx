import { getLandingPage } from '@/lib/contentful';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ProductShowcaseSection from '@/components/sections/ProductShowcaseSection';
import CTASection from '@/components/sections/CTASection';

export default async function Home() {
  const landingPage = await getLandingPage('econova-home');

  if (!landingPage) {
    return <div>Page not found</div>;
  }

  return (
    <main>
      <HeroSection hero={landingPage.heroSection} />
      {landingPage.featuresSection && (
        <FeaturesSection features={landingPage.featuresSection} />
      )}
      {landingPage.productShowcaseSection && (
        <ProductShowcaseSection showcase={landingPage.productShowcaseSection} />
      )}
      {landingPage.testimonialsSection && (
        <TestimonialsSection testimonials={landingPage.testimonialsSection} />
      )}
      {landingPage.ctaSection && (
        <CTASection cta={landingPage.ctaSection} />
      )}
    </main>
  );
}