import SmoothScroll from './components/layout/SmoothScroll';
import Navbar from './components/layout/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Contact from './sections/Contact';

function App() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-dark text-white selection:bg-brand-500/30">
        <Navbar />

        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </SmoothScroll>
  );
}

export default App;
