import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-x-12 gap-y-3 py-5 px-8 text-center md:justify-between bg-neutral-900 text-neutral-100">
      <p className="font-sans antialiased text-base text-current">
        © 2025 Churchment. Todos os direitos Reservados
      </p>
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <li>
          <Link
            href="https://www.instagram.com" // Coloque sua URL real
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-neutral-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-instagram-icon lucide-instagram"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com" // Coloque sua URL real
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-neutral-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-github-icon lucide-github"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </Link>
        </li>
        <li>
          <Link
            href="https://twitter.com" // Coloque sua URL real ou outra rede
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-neutral-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-twitter-icon lucide-twitter"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </Link>
        </li>
      </ul>
    </footer>
  );
}
