import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';

const heading = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });
const body = Outfit({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'Maggys Kollection | Strength & Dignity',
  description: 'Premium thrift boutique for the modern woman.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans bg-primary text-white`}>
        {children}
      </body>
    </html>
  );
}