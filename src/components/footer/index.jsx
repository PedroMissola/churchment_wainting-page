import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-x-12 gap-y-3 py-5 px-8 text-center md:justify-between bg-neutral-900 text-neutral-100">
      <p className="font-sans antialiased text-base text-current">
        © 2025 Churchment
      </p>
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <li>
          <Link
            href="/#home"
            className="font-sans antialiased text-base text-current hover:text-neutral-100"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/#sobre"
            className="font-sans antialiased text-base text-current hover:text-neutral-100"
          >
            Sobre Nós
          </Link>
        </li>
        <li>
          <Link
            href="/#form"
            className="font-sans antialiased text-base text-current hover:text-neutral-100"
          >
            Participe
          </Link>
        </li>
      </ul>
    </footer>
  );
}
