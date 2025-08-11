"use client";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "#about-me", label: "Sobre mí" },
    { href: "#experience", label: "Experiencia" },
    { href: "#education", label: "Educación" },
    // { href: "#projects", label: "Proyectos" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 shadow z-50">
      <nav
        className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center"
        role="navigation"
        aria-label="Main Navigation"
      >
        <h1 className="text-xl font-bold text-white">Franco Mariño</h1>

        {/* Botón hamburguesa */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="block w-6 h-0.5 bg-white mb-1 transition-transform"></span>
          <span className="block w-6 h-0.5 bg-white mb-1 transition-transform"></span>
          <span className="block w-6 h-0.5 bg-white transition-transform"></span>
        </button>

        {/* Menú */}
        <ul
          className={`flex flex-col md:flex-row gap-4 absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent transition-all duration-200 ease-in-out ${
            menuOpen ? "flex" : "hidden"
          } md:flex md:items-center`}
        >
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={closeMenu}
                className="text-white block py-2 px-4 md:p-0 hover:text-indigo-300 transition"
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
