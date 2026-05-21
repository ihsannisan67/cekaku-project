import {
  HeroSection,
  HowItWorks,
  AlgorithmExplainer,
  DisclaimerBanner,
  CallToAction,
} from '@/components/landing';

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <HowItWorks />
      <AlgorithmExplainer />
      <DisclaimerBanner />
      <CallToAction />
    </main>
  );
}