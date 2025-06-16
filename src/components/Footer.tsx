import Image from 'next/image';
import GitHubSvg from '../../public/github-svgrepo-com.svg';
import LinkedInSvg from '../../public/linkedin-svgrepo-com.svg'

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center md:justify-between gap-4">
        {/* Texto alineado a la izquierda */}
        <span className="w-full md:w-auto text-left text-sm text-gray-400 md:order-1 order-2">
            &copy; {year} Franco Mariño.
            <br />
            Todos los derechos reservados.
        </span>
        {/* Íconos alineados a la derecha */}
        <div className="flex gap-4 md:order-2 order-1">
          <a
            href="https://github.com/fmarinoa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-gray-400 text-2xl"
          >
            <Image src={GitHubSvg} alt="GitHub" width={32} height={32} />
          </a>
          <a
            href="https://www.linkedin.com/in/fmarinoa/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-gray-400 text-2xl"
          >
            <Image src={LinkedInSvg} alt="LinkedIn" width={32} height={32} />
          </a>
        </div>
      </div>
    </footer>
  );
}