import Hero from '../sections/hero/Hero';
import Marquee from '../sections/marquee/Marquee';
import OpeningSequence from '../components/opening/OpeningSequence';
import SelectedWork from '../sections/projects/SelectedWork';
import AiLearningSection from '../sections/aiLearning/AiLearningSection';
import SkillsSection from '../sections/skills/SkillsSection';

function Home() {
  return (
    <main className="home-page">
      <OpeningSequence />
      <Hero />
      <Marquee />
      <SelectedWork />
      <AiLearningSection />
      <SkillsSection />
      {/* Future sections: About, Journey, Lab, Contact CTA */}
    </main>
  );
}

export default Home;

