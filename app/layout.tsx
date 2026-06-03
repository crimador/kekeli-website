import type { Metadata } from 'next';
import './globals.css';
import ChatBot from '@/components/ChatBot';

export const metadata: Metadata = {
  title: 'KEKELI GROUP SARL-U — Conseil & Services à Lomé, Togo',
  description: 'Nous mettons la lumière sur vos entreprises. Comptabilité, fiscalité, marketing, formations, solutions IT à Attiégou, Lomé, Togo.',
  keywords: 'KEKELI GROUP, conseil, comptabilité, fiscalité, marketing, Lomé, Togo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
