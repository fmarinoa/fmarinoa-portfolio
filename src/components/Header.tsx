"use client";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 shadow z-50">
      <nav className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Franco Mariño</h1>
        {/* Botón hamburguesa */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
        {/* Menú */}
        <ul
          className={`flex-col md:flex-row md:flex gap-4 text-sm font-medium absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent transition-all duration-200 ${
            menuOpen ? "flex" : "hidden"
          } md:items-center`}
        >
          <li>
            <a href="#about-me" className="text-white block py-2 px-4 md:p-0" onClick={() => setMenuOpen(false)}>
              Sobre mí
            </a>
          </li>
          <li>
            <a href="#experience" className="text-white block py-2 px-4 md:p-0" onClick={() => setMenuOpen(false)}>
              Experiencia
            </a>
          </li>
          <li>
            <a href="#education" className="text-white block py-2 px-4 md:p-0" onClick={() => setMenuOpen(false)}>
              Educación
            </a>
          </li>
          <li>
            <a href="#projects" className="text-white block py-2 px-4 md:p-0" onClick={() => setMenuOpen(false)}>
              Proyectos
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}