export interface CTAButton {
  text: string;
  link: string;
  variant?: 'primary' | 'secondary';
  openInNewTab?: boolean;
}

export interface HeroSection {
  __typename: 'HeroSection';
  headline: string;
  subHeadline?: string;
  backgroundImage?: {
    url: string;
    title: string;
  };
  backgroundVideo?: {
    url: string;
    title: string;
  };
  mediaPreference?: 'image' | 'video';
  ctaButton?: CTAButton;
}

export interface FeatureItem {
  title: string;
  description: string;
  image: {
    url: string;
    title: string;
  };
}

export interface FeaturesSection {
  __typename: 'FeaturesSection';
  headline: string;
  subHeadline?: string;
  features: FeatureItem[];
}

export interface AuthorProfile {
  name: string;
  title: string;
  company: string;
  profileImage?: {
    url: string;
    title: string;
  };
  linkedInUrl?: string;
}

export interface Testimonial {
  quote: string;
  author: AuthorProfile;
  rating?: number;
  featured?: boolean;
}

export interface TestimonialsSection {
  __typename: 'TestimonialsSection';
  headline: string;
  subHeadline?: string;
  testimonials: Testimonial[];
}

export interface ProductSpecification {
  label: string;
  value: string;
  category?: string;
  icon?: string;
}

export interface ProductImage {
  image: {
    url: string;
    title: string;
    description?: string;
  };
  caption?: string;
  order?: number;
}

export interface ProductShowcaseSection {
  __typename: 'ProductShowcaseSection';
  headline: string;
  description?: string;
  specifications: ProductSpecification[];
  productImages: ProductImage[];
  ctaButton?: CTAButton;
}

export interface CTASection {
  __typename: 'CtaSection';
  headline: string;
  description?: string;
  primaryButton: CTAButton;
  secondaryButton?: CTAButton;
  backgroundStyle?: 'gradient' | 'pattern' | 'solid';
}

// Union type for all possible sections
export type Section = 
  | HeroSection 
  | FeaturesSection 
  | TestimonialsSection 
  | ProductShowcaseSection 
  | CTASection;

export interface LandingPage {
  title: string;
  slug: string;
  sections: Section[]; // Dynamic array of sections
}