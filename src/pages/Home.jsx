import Hero from '../sections/hero/Hero';
import Marquee from '../sections/marquee/Marquee';
import OpeningSequence from '../components/opening/OpeningSequence';
import SelectedWork from '../sections/projects/SelectedWork';

function Home() {
  return (
    <main className="home-page">
      <OpeningSequence />
      <Hero />
      <Marquee />
      <SelectedWork />
      {/* Future sections: Manifesto, Developer DNA, AI Learning, Lab, Journey, Contact CTA */}
    </main>
  );
}

export default Home;

