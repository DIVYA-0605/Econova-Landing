import Image from 'next/image';
import { HeroSection as HeroType } from '@/types';
import CTAButton from '@/components/sections/CTAButton';

interface Props {
  hero: HeroType;
}

export default function HeroSection({ hero }: Props) {
  const hasVideo = hero.backgroundVideo?.url;
  const hasImage = hero.backgroundImage?.url;
  
  // Determine what to display based on preference
  const shouldDisplayVideo = hero.mediaPreference === 'video' && hasVideo;
  const shouldDisplayImage = hero.mediaPreference === 'image' && hasImage;
  
  // Fallback logic if preference doesn't match available media
  const displayVideo = shouldDisplayVideo || (!shouldDisplayImage && hasVideo && hero.mediaPreference !== 'image');
  const displayImage = shouldDisplayImage || (!shouldDisplayVideo && hasImage && hero.mediaPreference !== 'video');

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Media */}
      {displayVideo && hasVideo ? (
        <>
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={hero.backgroundVideo!.url} type="video/mp4" />
            {/* Fallback to image if video fails to load */}
            {hasImage && hero.backgroundImage && (
              <Image
                src={hero.backgroundImage.url}
                alt={hero.backgroundImage.title}
                fill
                className="object-cover"
                priority
              />
            )}
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </>
      ) : displayImage && hasImage ? (
        <>
          {/* Image Background */}
          <div className="absolute inset-0">
            <Image
              src={hero.backgroundImage!.url}
              alt={hero.backgroundImage!.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </>
      ) : (
        /* Gradient Background Fallback */
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800" />
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
          {hero.headline}
        </h1>
        
        {hero.subHeadline && (
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            {hero.subHeadline}
          </p>
        )}

        {hero.ctaButton && (
          <div className="animate-fade-in-up animation-delay-400">
            <CTAButton
              text={hero.ctaButton.text}
              link={hero.ctaButton.link}
              variant={hero.ctaButton.variant || 'primary'}
              size="large"
              openInNewTab={hero.ctaButton.openInNewTab}
            />
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}