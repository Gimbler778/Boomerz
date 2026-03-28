import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/dictionary', label: 'Dictionary' },
  { to: '/styles', label: 'Styles' },
  { to: '/about', label: 'About' },
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-amber-50/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="text-lg font-black uppercase tracking-[0.2em] text-zinc-900">
          Bommerz Lab
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition',
                  isActive
                    ? 'bg-zinc-900 text-amber-100'
                    : 'bg-zinc-900/5 text-zinc-700 hover:bg-zinc-900/15',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
