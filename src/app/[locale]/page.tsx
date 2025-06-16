import { getLandingPage } from '@/lib/contentful';
import DynamicSection from '@/components/DynamicSection';
import { notFound } from 'next/navigation';
import type { Section } from '@/types';

export async function generateStaticParams() {
  return [
    { locale: 'en-US' },
    { locale: 'es-ES' }
  ];
}

export default async function LocalizedHome({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const landingPage = await getLandingPage('econova-home', locale);

  if (!landingPage) {
    notFound();
  }

  return (
    <>
      {landingPage.sections.map((section: Section, index: number) => (
        <DynamicSection key={`section-${index}`} section={section} />
      ))}
    </>
  );
}