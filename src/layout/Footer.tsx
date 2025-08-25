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
      <img src={urlMedia} alt={label} width={32} height={32} />
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-800 text-white px-4 py-3 shadow z-50">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
        <div className="flex gap-4 justify-center w-full md:w-auto">
          <IconsFooter
            url="https://github.com/fmarinoa"
            label="GitHub"
            urlMedia="src/assets/socialmedia/github.svg"
          />
          <IconsFooter
            url="https://www.linkedin.com/in/fmarinoa/"
            label="LinkedIn"
            urlMedia="src/assets/socialmedia/linkedin.svg"
          />
        </div>
        <span className="w-full md:w-auto text-center md:text-right text-sm text-gray-400">
          &copy; {year} Franco Mariño
          <br />
          Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
}
