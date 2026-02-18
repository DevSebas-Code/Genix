import SmoothScroll from './components/layout/SmoothScroll';
import Navbar from './components/layout/Navbar';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Founder from './sections/Founder';
import Contact from './sections/Contact';

function App() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-dark text-white selection:bg-brand-500/30">
        <Navbar />

        <Hero />
        <Services />
        <Founder />
        <Contact />
      </main>
    </SmoothScroll>
  );
}

export default App;
