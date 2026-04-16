import { Oswald, Outfit } from 'next/font/google';
import './globals.css';

const heading = Oswald({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['400', '700']
});

const body = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['300', '400', '600']
});

export const metadata = {
  title: 'Maggys Kollection | Adorned in Strength and Dignity',
  description: 'Premium thrift boutique in Ibadan and Ilorin delivering curated high-end fashion.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}