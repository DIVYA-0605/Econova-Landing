const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

const query = `
  query GetLandingPage($slug: String!, $locale: String!) {
    landingPageCollection(where: { slug: $slug }, limit: 1, locale: $locale) {
     items {
      title
      slug
      sectionsCollection(limit: 10) {
        items {
          __typename
          ... on HeroSection {
            headline
            subHeadline
            backgroundImage {
              url
              title
              width
              height
            }
            backgroundVideo {
              url
              title
            }
            mediaPreference
            ctaButton {
              ... on CtaButton {
                text
                link
                variant
                openInNewTab
              }
            }
          }
          ... on FeaturesSection {
            headline
            subHeadline
            featuresCollection(limit: 5) {
              items {
                ... on FeatureItem {
                  title
                  description
                  image {
                    url
                    title
                    width
                    height
                  }
                }
              }
            }
          }
          ... on TestimonialsSection {
            headline
            subHeadline
            testimonialsCollection(limit: 5) {
              items {
                ... on Testimonial {
                  quote
                  rating
                  featured
                  author {
                    ... on AuthorProfile {
                      name
                      title
                      company
                      avatar {
                        url
                        title
                      }
                    }
                  }
                }
              }
            }
          }
          ... on ProductShowcaseSection {
            headline
            description
            specificationsCollection(limit: 15) {
              items {
                ... on ProductSpecification {
                  label
                  value
                  category
                }
              }
            }
            productImagesCollection(limit: 5) {
              items {
                ... on ProductImage {
                  caption
                  order
                  image {
                    url
                    title
                    description
                  }
                }
              }
            }
            ctaButton {
              ... on CtaButton {
                text
                link
                variant
                openInNewTab
              }
            }
          }
          ... on CtaSection {
            headline
            description
            backgroundStyle
            primaryButton {
              ... on CtaButton {
                text
                link
                variant
                openInNewTab
              }
            }
            secondaryButton {
              ... on CtaButton {
                text
                link
                variant
                openInNewTab
              }
            }
          }
        }
      }
    }
    }
  }
`;

export async function getLandingPage(slug: string, locale: string = 'en-US') {
  try {
    const response = await fetch(CONTENTFUL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: { slug, locale },
      }),
      next: { revalidate: 5 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const { data } = await response.json();
    const page = data?.landingPageCollection?.items[0];
    
    if (!page) return null;

    // Transform the sections
    const sections = page.sectionsCollection?.items || [];
    
    // Process each section based on its type
    const processedSections = sections.map((section: any) => {
      switch (section.__typename) {
        case 'FeaturesSection':
          return {
            ...section,
            features: section.featuresCollection?.items || []
          };
        case 'TestimonialsSection':
          return {
            ...section,
            testimonials: section.testimonialsCollection?.items || []
          };
        case 'ProductShowcaseSection':
          return {
            ...section,
            specifications: section.specificationsCollection?.items || [],
            productImages: section.productImagesCollection?.items || []
          };
        default:
          return section;
      }
    });

    return {
      ...page,
      sections: processedSections
    };
  } catch (error) {
    console.error('Error fetching landing page:', error);
    return null;
  }
}

