import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <nav className="mb-8" aria-label="Main navigation">
        <ul className="flex gap-4" role="menubar">
          <li role="none">
            <Link
              href="#about"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded"
              role="menuitem"
            >
              About
            </Link>
          </li>
          <li role="none">
            <Link
              href="#projects"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded"
              role="menuitem"
            >
              Projects
            </Link>
          </li>
          <li role="none">
            <Link
              href="#contact"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded"
              role="menuitem"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <h1 className="text-4xl font-bold mb-6">Professional Portfolio</h1>
      <section id="about" className="prose lg:prose-xl" aria-labelledby="about-heading">
        <h2 id="about-heading" className="sr-only">
          About
        </h2>
        <p>
          Welcome to my portfolio website. Here you&apos;ll find my latest projects and professional
          experience.
        </p>
      </section>
      <footer className="mt-8" role="contentinfo">
        <p>© {new Date().getFullYear()} Your Name</p>
      </footer>
    </main>
  );
}
