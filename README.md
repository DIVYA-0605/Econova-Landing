# EcoNova Landing Page

A dynamic, responsive landing page built with Next.js 15, TypeScript, and Contentful CMS.

🚀 **Live Demo**: https://econova-landing-lrn2.vercel.app/es-ES

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Contentful account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DIVYA-0605/Econova-Landing.git
cd econova-landing
```

2. Install dependencies:
```bash
npm install
```

3. Environment Setup:
```bash
cp .env.local.example .env.local
```

Add your Contentful credentials to `.env.local`:
```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
```

4. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Contentful Setup

### Option 1: Import Content Model
```bash
# Use the provided export file
contentful space import --content-file ./contentful/export.json
```

### Option 2: Manual Setup
See [contentful/setup.md](./contentful/setup.md) for detailed content type definitions.

### Content Types Overview:
- **Landing Page** - Main page container with dynamic sections
- **Hero Section** - Hero banner with video/image support
- **Features Section** - Feature cards grid
- **Testimonials Section** - Customer testimonials
- **Product Showcase** - Product images and specifications
- **CTA Section** - Call-to-action blocks
- **Reusable Types** - CTA Buttons, Author Profiles, Navigation Items

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **CMS**: Contentful (Headless)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/        # Internationalization
│   │   ├── page.tsx     # Dynamic page
│   │   └── layout.tsx   # Locale layout
│   └── layout.tsx       # Root layout
├── components/
│   ├── sections/        # Content sections
│   ├── ui/             # Reusable UI components
│   └── DynamicSection.tsx
├── lib/
│   └── contentful.ts    # Contentful client
└── types/              # TypeScript definitions
```

## 🌍 Features

- ✅ Dynamic section ordering
- ✅ Internationalization (en-US, es-ES)
- ✅ Responsive design
- ✅ ISR (Incremental Static Regeneration)
- ✅ TypeScript support
- ✅ SEO optimized
- ✅ Accessibility compliant

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`
4. Deploy

### Environment Variables
```env
CONTENTFUL_SPACE_ID=xxx
CONTENTFUL_ACCESS_TOKEN=xxx
```

# EcoNova Landing Page - Comprehensive Documentation

## Table of Contents
1. [Content Model Design & Headless Principles](#content-model-design)
2. [Frontend Architecture](#frontend-architecture)
3. [Technical Decisions & Justifications](#technical-decisions)
4. [Challenges & Solutions](#challenges-solutions)
5. [Benefits & Trade-offs](#benefits-tradeoffs)
6. [Scalability Considerations](#scalability)

---

## 1. Content Model Design & Headless Principles {#content-model-design}

### 1.1 Headless CMS Philosophy

Our Contentful content model embodies core headless CMS principles:

#### **Content Reusability**
The content model prioritizes reusability through a reference-based architecture:

- **Shared Content Types**: CTA Buttons, Author Profiles, and Product Specifications exist as independent entities that can be referenced multiple times
- **Single Source of Truth**: When a CTA button text needs updating, it's changed once and reflected everywhere
- **Example**: The "Get Started" button is created once but used in Hero, Product Showcase, and CTA sections

#### **Channel Agnosticism**
Content is structured without any presentation logic:

- **Pure Data**: All content is stored as structured JSON without HTML or CSS
- **API-First Design**: Content is accessible via GraphQL for any channel (web, mobile, digital signage, IoT)
- **Presentation Independence**: A testimonial quote can be displayed as a card on web, a notification on mobile, or text in an email

#### **Scalability & Flexibility**
The model scales horizontally and vertically:

- **Dynamic Sections Array**: Landing pages don't have fixed fields but rather an array that accepts any section type
- **Extensible Architecture**: New section types can be added without modifying existing content
- **Multi-tenant Capability**: One Contentful space can serve multiple brands or websites

### 1.2 Content Type Relationships

```
Landing Page
├── Header Section
│   ├── Logo (Media)
│   ├── Navigation Items[] (References)
│   └── CTA Button (Reference)
└── Sections[] (Mixed References)
    ├── Hero Section
    │   ├── Headlines (Localized)
    │   ├── Media (Image/Video)
    │   └── CTA Button (Reference)
    ├── Features Section
    │   └── Feature Items[] (References)
    ├── Testimonials Section
    │   └── Testimonials[] (References)
    │       └── Author Profile (Reference)
    ├── Product Showcase
    │   ├── Specifications[] (References)
    │   ├── Product Images[] (References)
    │   └── CTA Button (Reference)
    └── CTA Section
        ├── Primary Button (Reference)
        └── Secondary Button (Reference)
```

### 1.3 Editorial Workflow Benefits

**For Content Editors:**
- Drag-and-drop section reordering
- Preview unpublished changes
- A/B test different layouts
- Reuse content across pages

**For Developers:**
- Type-safe content delivery
- Predictable data structure
- Easy to extend
- Clear separation of concerns

---

## 2. Frontend Architecture {#frontend-architecture}

### 2.1 Component Architecture

The frontend follows a modular, scalable architecture:

#### **Dynamic Section Rendering**
```typescript
// Core rendering logic
export default function DynamicSection({ section }: DynamicSectionProps) {
  switch (section.__typename) {
    case 'HeroSection':
      return <HeroSection hero={section} />;
    case 'FeaturesSection':
      return <FeaturesSection features={section} />;
    // ... other sections
  }
}
```

This pattern provides:
- **Extensibility**: Adding new sections requires minimal code
- **Type Safety**: TypeScript ensures correct props
- **Code Splitting**: Dynamic imports optimize bundle size

#### **Data Fetching Strategy**

We use GraphQL with ISR (Incremental Static Regeneration):

```typescript
// Optimized GraphQL query
const query = `
  query GetLandingPage($slug: String!, $locale: String!) {
    landingPageCollection(where: { slug: $slug }, locale: $locale) {
      items {
        sectionsCollection {
          items {
            __typename
            ... on HeroSection { /* fields */ }
            ... on FeaturesSection { /* fields */ }
          }
        }
      }
    }
  }
`;

// ISR configuration
next: { revalidate: 60 } // 60-second cache
```

### 2.2 Rendering Strategy Justification

**Why ISR over SSG/SSR?**

| Strategy | Build Time | Content Freshness | Performance | Use Case |
|----------|------------|-------------------|-------------|----------|
| SSG | Long (all pages) | Requires rebuild | Excellent | Static sites |
| SSR | None | Always fresh | Variable | Dynamic data |
| **ISR** | **Short (on-demand)** | **Configurable** | **Excellent** | **CMS content** |

ISR provides:
- Static-like performance (served from CDN)
- Fresh content without rebuilds
- Optimal for marketing pages

### 2.3 Performance Optimizations

1. **Image Optimization**
   - Next.js Image component with lazy loading
   - Responsive images with srcset
   - WebP format with fallbacks

2. **Code Splitting**
   - Dynamic imports for sections
   - Route-based splitting
   - Component-level lazy loading

3. **Caching Strategy**
   - ISR with 60-second revalidation
   - Static assets with long cache headers
   - API responses cached at edge

---

## 3. Technical Decisions & Justifications {#technical-decisions}

### 3.1 TypeScript Implementation

**Decision**: Strict TypeScript throughout the project

**Justification**:
- Catches content structure errors at build time
- Provides IntelliSense for Contentful data
- Reduces runtime errors
- Self-documenting code

**Implementation**:
```typescript
// Comprehensive type definitions
export interface HeroSection {
  __typename: 'HeroSection';
  headline: string;
  subHeadline?: string;
  backgroundImage?: Asset;
  backgroundVideo?: Asset;
  mediaPreference?: 'image' | 'video';
  ctaButton?: CTAButton;
}
```

### 3.2 Localization Strategy

**Decision**: Field-level localization instead of entry-level

**Justification**:
- Easier content management
- Fallback to default locale
- Partial translations supported
- Single entry to manage

**Trade-offs**:
- Larger API responses
- All locales fetched together

### 3.3 State Management

**Decision**: No external state management library

**Justification**:
- Content is read-only from CMS
- React's built-in state sufficient
- Reduces bundle size
- Simpler architecture

---

## 4. Challenges & Solutions {#challenges-solutions}

### Challenge 1: Dynamic Types from Contentful

**Problem**: TypeScript couldn't infer types from GraphQL responses

**Solution**: 
- Created comprehensive type definitions
- Implemented type guards
- Added runtime validation

```typescript
// Type guard example
function isHeroSection(section: any): section is HeroSection {
  return section.__typename === 'HeroSection';
}
```

### Challenge 2: Preview Mode Implementation

**Problem**: Content editors needed to preview unpublished changes

**Solution**:
- Implemented Next.js Draft Mode
- Created preview API endpoint
- Used Contentful Preview API
- Added exit-preview functionality

### Challenge 3: Hydration Errors with Localization

**Problem**: Locale paths causing hydration mismatches

**Solution**:
- Updated to Next.js 15 async params
- Properly structured locale routing
- Fixed static asset paths

### Challenge 4: Performance with Large Media

**Problem**: Hero videos impacting Core Web Vitals

**Solution**:
- Implemented lazy loading for videos
- Added poster images
- Used intersection observer
- Optimized video encoding

---

## 5. Benefits & Trade-offs {#benefits-tradeoffs}

### 5.1 Content Editor Perspective

**Benefits:**
- ✅ Complete control over page layout
- ✅ Reusable content blocks
- ✅ Visual preview of changes
- ✅ No developer dependency for content updates
- ✅ A/B testing capabilities

**Trade-offs:**
- ❌ Learning curve with references
- ❌ More steps to create complex pages
- ❌ Need to understand content relationships

### 5.2 Developer Perspective

**Benefits:**
- ✅ Type-safe development
- ✅ Clear separation of concerns
- ✅ Easy to add new features
- ✅ Predictable data structure
- ✅ Excellent performance

**Trade-offs:**
- ❌ Initial setup complexity
- ❌ Need to handle edge cases
- ❌ More boilerplate for types

### 5.3 Business Perspective

**Benefits:**
- ✅ Faster time to market
- ✅ Reduced development costs
- ✅ Improved SEO
- ✅ Better performance metrics
- ✅ Multi-channel ready

**Trade-offs:**
- ❌ Contentful subscription costs
- ❌ Training requirements
- ❌ Initial development investment

---

## 6. Scalability Considerations {#scalability}

### 6.1 Horizontal Scaling

**Adding New Section Types:**
1. Create content type in Contentful
2. Add TypeScript interface
3. Create React component
4. Add case to DynamicSection

**Time to implement**: ~2 hours per section type

### 6.2 Vertical Scaling

**Supporting New Channels:**
```typescript
// Example: Email channel
const renderForEmail = (section: Section) => {
  switch(section.__typename) {
    case 'HeroSection':
      return <EmailHero {...section} />;
    // ... other sections
  }
};
```

### 6.3 Performance at Scale

**Handling 1000+ Pages:**
- ISR ensures only visited pages are built
- CDN caching reduces origin requests
- GraphQL prevents over-fetching
- Edge functions for personalization

### 6.4 Team Scaling

**Supporting Multiple Teams:**
- Content model supports multiple brands
- Role-based access in Contentful
- Git workflow for code changes
- Environment isolation

---

## Conclusion

This implementation demonstrates a production-ready headless CMS architecture that balances flexibility, performance, and developer experience. The content model is designed for long-term scalability while remaining accessible to content editors.

The combination of Next.js 15's advanced features with Contentful's powerful content modeling creates a solution that can grow with business needs while maintaining excellent performance and user experience.