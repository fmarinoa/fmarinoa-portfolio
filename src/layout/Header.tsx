'use client';
import { useEffect, useState } from 'react';

import downloadIcon from '@/assets/icons/download.svg';
import { Constants } from '@/data/constants';

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: '#about-me', label: 'Sobre mí' },
  { href: '#experience', label: 'Experiencia' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#education', label: 'Educación' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  const closeMenu = (): void => setMenuOpen(false);

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

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900/90 backdrop-blur-md shadow z-50">
      <nav
        className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center"
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="flex items-center gap-4">
          <h1 className="text-lg md:text-xl font-bold text-white tracking-wide">Franco Mariño</h1>
          <a
            href={Constants.CV_URL}
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

        <ul
          className={`flex flex-col md:flex-row gap-4 
    absolute md:static top-14 left-0 
    w-full md:w-auto bg-gray-800 md:bg-transparent 
    transition-all duration-200 ease-in-out 
    ${menuOpen ? 'flex rounded-b-2xl' : 'hidden'} 
    md:flex md:items-center`}
        >
          {navItems.map((item: NavItem) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={closeMenu}
                className={`block py-2 px-4 md:p-0 transition-colors duration-200 ${
                  active === item.href
                    ? 'text-indigo-400 font-semibold'
                    : 'text-white hover:text-indigo-300'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
