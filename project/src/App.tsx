import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Education from './components/Education';
import OJT from './components/OJT';
import CallToAction from './components/CallToAction';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BackgroundCanvas from './components/BackgroundCanvas';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const { mode } = useTheme();

  return (
    <div className={`relative min-h-screen overflow-x-hidden bg-neutral-950 text-white selection:bg-red-500/30 transition-colors duration-500 ${mode === 'space' ? 'theme-space' : ''}`}>
      
      {/* Background Layer */}
      <div className="fixed inset-0 -z-10">
        <BackgroundCanvas />
      </div>

      {/* Cursor Layer */}
      <CustomCursor />

      {/* Noise Overlay */}
      <div
        className="noise-overlay fixed inset-0 pointer-events-none z-40"
        aria-hidden="true"
      />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Stats />
        <About />
        <Projects />
        <TechStack />
        <Experience />
        <Education />
        <OJT />
        <CallToAction />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}