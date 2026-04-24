import './globals.css';
import { AppShell, HeaderNav } from '@streetfit/ui';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.WEB_ORIGIN ?? 'http://localhost:3000'),
  title: 'StreetFit — Calisthenics & Strength',
  description: 'Train anywhere. Beginner to advanced plans with 3D demos and offline timers.'
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-white text-slate-900">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
        <AppShell header={<HeaderNav/>}>{children}</AppShell>
        <div aria-live="polite" aria-atomic="true" className="sr-only" id="live-region" />
        <script dangerouslySetInnerHTML={{__html:`if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js').catch(()=>{});}`}} />
      </body>
    </html>
  );
}
