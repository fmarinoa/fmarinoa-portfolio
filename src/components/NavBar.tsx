import { NavItem } from '@/types';

type NavProps = {
  navItems: NavItem[];
  active: string;
  onLinkClick: () => void;
  menuOpen: boolean;
};

export function NavBar({ navItems, active, onLinkClick, menuOpen }: NavProps) {
  return (
    <ul
      className={`flex flex-col md:flex-row gap-4 
        absolute md:static top-14 left-0 
        w-full md:w-auto bg-gray-800 md:bg-transparent 
        transition-all duration-200 ease-in-out 
        ${menuOpen ? 'flex rounded-b-2xl' : 'hidden'} 
        md:flex md:items-center`}
    >
      {navItems.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            onClick={onLinkClick}
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
  );
}
