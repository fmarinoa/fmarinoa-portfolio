import Image from 'next/image';

type IconsFooter = {
  url: string;
  label: string;
  urlMedia: string;
};

function IconsFooter({ url, label, urlMedia }: Readonly<IconsFooter>) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="hover:text-gray-400 text-2xl"
    >
      <Image src={urlMedia} alt={label} width={32} height={32} />
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
        {/* Íconos alineados a la izquierda o centrados en mobile */}
        <div className="flex gap-4 justify-center w-full md:w-auto">
          <IconsFooter
            url="https://github.com/fmarinoa"
            label="GitHub"
            urlMedia="/github-svgrepo-com.svg"
          />
          <IconsFooter
            url="https://www.linkedin.com/in/fmarinoa/"
            label="LinkedIn"
            urlMedia="/linkedin-svgrepo-com.svg"
          />
        </div>
        {/* Texto alineado a la derecha o centrado en mobile */}
        <span className="w-full md:w-auto text-center md:text-right text-sm text-gray-400">
          &copy; {year} Franco Mariño.<br />Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
}