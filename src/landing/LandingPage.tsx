import Header from './Header';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import LearningPathsSection from './LearningPathsSection';
import RewardsSection from './RewardsSection';
import SimulationSection from './SimulationSection';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <SimulationSection />
      <RewardsSection />
      <LearningPathsSection />
      <Footer />
    </main>
  );
}