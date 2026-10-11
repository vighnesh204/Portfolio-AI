import Hero from '../sections/hero/Hero';
import Marquee from '../sections/marquee/Marquee';
import OpeningSequence from '../components/opening/OpeningSequence';

function Home() {
  return (
    <main className="home-page">
      <OpeningSequence />
      <Hero />
      <Marquee />
      {/* Future sections: Manifesto, Featured Work, Developer DNA, AI Learning, Lab, Journey, Contact CTA */}
    </main>
  );
}

export default Home;
