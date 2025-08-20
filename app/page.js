import Home from "./components/pages/Home";

export const metadata = {
  title:
    "KrishiBazar - Islamic Finance for Agriculture | Connect Farmers & Investors",
  description:
    "KrishiBazar is a revolutionary Shariah-compliant platform connecting farmers with investors through Islamic finance principles. Invest in agriculture ethically.",
  keywords:
    "Islamic finance, agriculture, farming, investment, Bangladesh, Shariah compliant, Mudarabah, farm financing",
  authors: [{ name: "KrishiBazar Team" }],
  creator: "KrishiBazar",
  publisher: "KrishiBazar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://krishibazar.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KrishiBazar - Islamic Finance for Agriculture",
    description:
      "Connect farmers with investors through Shariah-compliant Islamic finance principles. Invest ethically in agriculture.",
    url: "https://krishibazar.com",
    siteName: "KrishiBazar",
    images: [
      {
        url: "/images/logo/logo.svg",
        width: 1200,
        height: 630,
        alt: "KrishiBazar Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KrishiBazar - Islamic Finance for Agriculture",
    description:
      "Connect farmers with investors through Shariah-compliant Islamic finance principles.",
    images: ["/images/logo/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export default function Page() {
  return <Home />;
}
