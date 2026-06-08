import { Inter } from "next/font/google";
import "./globals.css";

//components
import Header from "@/components/Header";
// import StairTransition from "@/components/StairTransition";
import PageTransition from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: '--font-Inter'
 });

export const metadata = {
  title: "Babatunde Oladejo | Senior Software Engineer",
  description: "Senior Software Engineer with 6+ years building fintech platforms, transaction-driven systems, and scalable enterprise applications. Specialized in event-driven architecture, Node.js, and technical leadership.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Header />
        <PageTransition />
        {/* <StairTransition /> */}
        {children}
      </body>
    </html>
  );
}
