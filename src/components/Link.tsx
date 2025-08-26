interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function Link({ href, children, className }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-blue-400 hover:underline hover:text-indigo-400 transition-colors ${className}`}
    >
      {children}
    </a>
  );
}
