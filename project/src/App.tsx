import { useEffect, useRef } from 'react';
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

export default function App() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-background-DEFAULT text-white overflow-x-hidden">
      {/* Cursor glow */}
      <div
        ref={cursorRef}
        className="cursor-glow hidden lg:block"
        aria-hidden="true"
      />

      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <Navbar />
      <main>
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
      <Footer />
    </div>
  );
}
