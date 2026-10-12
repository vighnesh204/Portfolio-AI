import Hero from '../sections/hero/Hero';
import Marquee from '../sections/marquee/Marquee';
import OpeningSequence from '../components/opening/OpeningSequence';
import SelectedWork from '../sections/projects/SelectedWork';
import AiLearningSection from '../sections/aiLearning/AiLearningSection';
import SkillsSection from '../sections/skills/SkillsSection';
import AboutSection from '../sections/about/AboutSection';
import JourneySection from '../sections/journey/JourneySection';
import ContactSection from '../sections/contact/ContactSection';
import Footer from '../components/layout/Footer';

function Home() {
  return (
    <main className="home-page">
      <OpeningSequence />
      <Hero />
      <Marquee />
      <SelectedWork />
      <AiLearningSection />
      <SkillsSection />
      <AboutSection />
      <JourneySection />
      <ContactSection />
      <Footer />
    </main>
  );
}

export default Home;


