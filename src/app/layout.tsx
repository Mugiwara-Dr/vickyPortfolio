import type { Metadata } from "next";
import { Montserrat, Nunito_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-heading",
});

const nunitoSans = Nunito_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Geetha Krishna | Visual Explorer",
  description: "Portfolio of Geetha Krishna, a Graphic Designer & Video Editor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${nunitoSans.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30 selection:text-accent overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
