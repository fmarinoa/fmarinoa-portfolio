'use client';
import { useEffect, useState } from 'react';

import downloadIcon from '@/assets/icons/download.svg';
import Alert from '@/components/Alert';
import { CvModal } from '@/components/CvModal';
import { NavBar } from '@/components/NavBar';
import { Constants } from '@/data/constants';
import { NavItem } from '@/types';

const navItems: NavItem[] = [
  { href: '#about-me', label: 'Sobre mí' },
  { href: '#experience', label: 'Experiencia' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#education', label: 'Educación' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [thanks, setThanks] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (const item of navItems) {
        const section = document.querySelector(item.href);
        if (section instanceof HTMLElement) {
          if (
            section.offsetTop <= scrollPos &&
            section.offsetTop + section.offsetHeight > scrollPos
          ) {
            setActive(item.href);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCvClick = () => setShowModal(true);

  const handleAgree = () => {
    setShowModal(false);
    window.location.href = Constants.CV_URL;

    setThanks(false);
    setTimeout(() => setThanks(true), 0);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-gray-900/90 backdrop-blur-md shadow z-50">
        <nav
          className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center"
          role="navigation"
          aria-label="Main Navigation"
        >
          <div className="flex items-center gap-4">
            <h1 className="text-lg md:text-xl font-bold text-white tracking-wide">Franco Mariño</h1>
            <a
              onClick={handleCvClick}
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1 bg-indigo-500 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200"
              title="Download CV"
            >
              <img src={downloadIcon} alt="Download CV" className="h-5 w-5" />
              <span className="hidden sm:inline">CV</span>
            </a>
          </div>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative z-50"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-white mb-1 transition-transform ${
                menuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white mb-1 transition-opacity ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-transform ${
                menuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            ></span>
          </button>
          <NavBar
            navItems={navItems}
            active={active}
            onLinkClick={() => setMenuOpen(false)}
            menuOpen={menuOpen}
          />
        </nav>
      </header>

      {showModal && <CvModal onAgree={handleAgree} onCancel={() => setShowModal(false)} />}
      {thanks && <Alert message="¡Gracias por abrir mi CV!" state="success" time={3000} />}
    </>
  );
}
