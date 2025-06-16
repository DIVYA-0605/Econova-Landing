import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import FooterSection from '@/components/sections/FooterSection';

export const metadata: Metadata = {
  title: 'EcoNova - Sustainable Technology',
  description: 'Revolutionary sustainable technology for a greener future',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen">
        {children}
      </main>
      <FooterSection />
    </>
  );
}