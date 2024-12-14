import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import Header from "@/app/Dulcinea/components/Header";
import {SeleccionProvider } from "app/components/images_gallery/hooks/useSeleccion"
import Footer from "./components/footer"
import { ReservationProvider } from './context/ReservationContext'

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: '--font-body',
});

export const metadata = {
  title: "Dulcinea",
  description: "Disco Dulcinea",
};

export default function DiscoLayout({ children }) {
  return (
    <div>
      <SeleccionProvider>
        <ReservationProvider>
      <div>
        <Header />
        <div className={cn('child-layout', fontBody.variable)}>
          {children}
        </div>
      </div>
      </ReservationProvider>
      </SeleccionProvider>
      <Footer/>
    </div>
  );
}

