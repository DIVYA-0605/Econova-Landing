import Image from 'next/image';
import { TestimonialsSection as TestimonialsSectionType } from '@/types';

interface Props {
  testimonials: TestimonialsSectionType;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection({ testimonials }: Props) {
  // Separate featured testimonials
  const featuredTestimonials = testimonials.testimonials.filter(t => t.featured);
  const regularTestimonials = testimonials.testimonials.filter(t => !t.featured);

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {testimonials.headline}
          </h2>
          {testimonials.subHeadline && (
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {testimonials.subHeadline}
            </p>
          )}
        </div>

        {/* Featured Testimonial */}
        {featuredTestimonials.length > 0 && (
          <div className="mb-16">
            {featuredTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-green-50 rounded-2xl p-8 md:p-12 mb-8">
                <div className="max-w-4xl mx-auto text-center">
                  {testimonial.rating && <StarRating rating={testimonial.rating} />}
                  <blockquote className="text-xl md:text-2xl text-gray-800 font-medium mb-8 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center justify-center gap-4">
                    {testimonial.author.profileImage && (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.author.profileImage.url}
                          alt={testimonial.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">
                        {testimonial.author.name}
                      </div>
                      <div className="text-gray-600">
                        {testimonial.author.title} at {testimonial.author.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Regular Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {testimonial.rating && <StarRating rating={testimonial.rating} />}
              <blockquote className="text-gray-700 mb-6 italic">
                 &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                {testimonial.author.profileImage && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.author.profileImage.url}
                      alt={testimonial.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {testimonial.author.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.author.title}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {testimonial.author.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
