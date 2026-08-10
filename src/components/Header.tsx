export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 p-8 z-50 flex justify-between items-start pointer-events-none">
      {/* Logo */}
      <div className="pointer-events-auto">
        <span className="text-sm font-bold tracking-[0.1em] uppercase">GENSHOUKETSU</span>
      </div>

      {/* Navigation */}
      <nav className="pointer-events-auto flex gap-6 text-sm tracking-[0.1em] uppercase font-semibold">
        <a href="#work" className="hover:opacity-70 transition-opacity flex items-center gap-2">
          <span className="w-1 h-1 bg-white rounded-full" />
          WORK
        </a>
        <a href="#contact" className="hover:opacity-70 transition-opacity">
          CONTACT
        </a>
      </nav>
    </header>
  );
}
