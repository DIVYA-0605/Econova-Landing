'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductShowcaseSection as ProductShowcaseSectionType } from '@/types';
import CTAButton from '@/components/sections/CTAButton';

interface Props {
  showcase: ProductShowcaseSectionType;
}

export default function ProductShowcaseSection({ showcase }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Group specifications by category
  const groupedSpecs = showcase.specifications.reduce((acc, spec) => {
    const category = spec.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(spec);
    return acc;
  }, {} as Record<string, typeof showcase.specifications>);

  // Sort images by order
  const sortedImages = [...showcase.productImages].sort((a, b) => 
    (a.order || 0) - (b.order || 0)
  );

  return (
    <section id="showcase" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {showcase.headline}
          </h2>
          {showcase.description && (
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {showcase.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Gallery */}
          <div className="order-2 lg:order-1">
            {sortedImages.length > 0 && (
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-lg">
                  <Image
                    src={sortedImages[selectedImage].image.url}
                    alt={sortedImages[selectedImage].image.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
                
                {/* Image Caption */}
                {sortedImages[selectedImage].caption && (
                  <p className="text-center text-gray-600 text-sm">
                    {sortedImages[selectedImage].caption}
                  </p>
                )}
                
                {/* Thumbnail Gallery */}
                {sortedImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {sortedImages.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index 
                            ? 'border-green-600 shadow-md' 
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <Image
                          src={item.image.url}
                          alt={item.image.title}
                          fill
                          className="object-cover"
                          sizes="150px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Specifications */}
          <div className="order-1 lg:order-2 space-y-8">
            {Object.entries(groupedSpecs).map(([category, specs]) => (
              <div key={category}>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  {category === 'Technical' && (
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  )}
                  {category === 'Environmental' && (
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {category === 'Performance' && (
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  {category} Specifications
                </h3>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <dl className="space-y-4">
                    {specs.map((spec, index) => (
                      <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                        <dt className="text-gray-600">{spec.label}</dt>
                        <dd className="font-semibold text-gray-900">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            ))}
            
            {/* CTA Button */}
            {showcase.ctaButton && (
              <div className="pt-6">
                <CTAButton
                  text={showcase.ctaButton.text}
                  link={showcase.ctaButton.link}
                  variant={showcase.ctaButton.variant || 'primary'}
                  size="large"
                  openInNewTab={showcase.ctaButton.openInNewTab}
                  className="w-full md:w-auto"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
