"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (window.location.pathname === '/') {
      router.push('/home');
    }
  }, [router]);

  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}