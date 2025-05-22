import "./globals.css";
import { inter, firaCode } from "./fonts";
import { GoogleAnalyticsTracker } from "@/app/analytics";
import Footer from "@/components/footer";
import Script from "next/script";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
  themeColor: "black",
};

export const metadata = {
  title: {
    default: "Churchment - Gestão de Igrejas Moderna e Simples",
    template: "%s | Churchment",
  },
  description: "O Churchment é uma plataforma moderna e completa para gestão de igrejas.",
  keywords: [
    "Churchment",
    "gestão de igrejas",
    "plataforma para igrejas",
    "eventos da igreja",
    "ministérios",
  ],
  authors: [{ name: "Churchment", url: "https://churchment.vercel.app/" }],
  creator: "Churchment",
  metadataBase: new URL("https://churchment.vercel.app/"),
  openGraph: {
    title: "Churchment - Gestão de Igrejas Moderna e Simples",
    description: "O Churchment é uma plataforma moderna e completa para gestão de igrejas.",
    url: "https://churchment.vercel.app/",
    siteName: "Churchment",
    images: [
      {
        url: "https://churchment.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Imagem representando o Churchment",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Churchment - Gestão de Igrejas",
    description: "Organize sua igreja de forma moderna com o Churchment.",
    images: ["https://churchment.vercel.app/opengraph-image.jpg"],
    creator: "@churchment",
  },
  icons: {
    icon: "icon/favicon.ico",
    apple: "icon/apple-touch-icon.png",
  },
  manifest: "icon/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className={`${inter.variable} ${firaCode.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2VRCN8LVBN"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2VRCN8LVBN');
            `,
          }}
        />
      </head>
      <body>
        <GoogleAnalyticsTracker />
        {children}
        <Footer />
      </body>
    </html>
  );
}