import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <nav className="mb-8" aria-label="Main navigation">
        <ul className="flex gap-4" role="menubar">
          <li role="none">
            <Link
              href="#about"
              className="rounded px-2 py-1 hover:underline focus:ring-2 focus:ring-blue-400 focus:outline-none"
              role="menuitem"
            >
              About
            </Link>
          </li>
          <li role="none">
            <Link
              href="#projects"
              className="rounded px-2 py-1 hover:underline focus:ring-2 focus:ring-blue-400 focus:outline-none"
              role="menuitem"
            >
              Projects
            </Link>
          </li>
          <li role="none">
            <Link
              href="#contact"
              className="rounded px-2 py-1 hover:underline focus:ring-2 focus:ring-blue-400 focus:outline-none"
              role="menuitem"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <h1 className="mb-6">Professional Portfolio</h1>
      <section id="about" aria-labelledby="about-heading" className="mb-6">
        <h2 id="about-heading" className="sr-only">
          About
        </h2>
        <p>Welcome to my portfolio website. Here you&apos;ll find my latest projects and professional experience.</p>
      </section>

      <footer className="mt-8" role="contentinfo">
        <p>© {new Date().getFullYear()} Michael Epelboim</p>
      </footer>
    </main>
  );
}
