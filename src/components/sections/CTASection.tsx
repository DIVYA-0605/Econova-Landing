import CTAButton from '@/components/sections/CTAButton';
import { CTASection as CTASectionType } from '@/types';

interface Props {
  cta: CTASectionType;
}

export default function CTASection({ cta }: Props) {
  const backgroundClasses = {
    gradient: 'bg-gradient-to-r from-green-600 to-green-700',
    pattern: 'bg-green-600 relative overflow-hidden',
    solid: 'bg-green-600'
  };

  return (
    <section id="contact" className={`py-20 ${backgroundClasses[cta.backgroundStyle || 'gradient']}`}>
      {/* Pattern overlay for pattern style */}
      {cta.backgroundStyle === 'pattern' && (
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          {cta.headline}
        </h2>

        {/* Description */}
        {cta.description && (
          <p className="text-lg md:text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            {cta.description}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <CTAButton
            text={cta.primaryButton.text}
            link={cta.primaryButton.link}
            variant={cta.primaryButton.variant || 'primary'}
            size="large"
            openInNewTab={cta.primaryButton.openInNewTab}
            className="min-w-[200px]"
          />
          
          {cta.secondaryButton && (
            <CTAButton
              text={cta.secondaryButton.text}
              link={cta.secondaryButton.link}
              variant="secondary"
              size="large"
              openInNewTab={cta.secondaryButton.openInNewTab}
              className="min-w-[200px]"
            />
          )}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-green-50">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Free Consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>30-Day Money Back</span>
          </div>
        </div>
      </div>
    </section>
  );
}