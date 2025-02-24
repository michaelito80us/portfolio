export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <nav className="mb-8">
        <ul className="flex gap-4">
          <li>
            <a href="#about" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:underline">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <h1 className="text-4xl font-bold mb-6">Professional Portfolio</h1>
      <section className="prose lg:prose-xl">
        <p>
          Welcome to my portfolio website. Here you&apos;ll find my latest projects and professional
          experience.
        </p>
      </section>
    </main>
  );
}
