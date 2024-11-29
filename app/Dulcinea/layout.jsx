import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import Header from "@/app/Dulcinea/components/Header";

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
      
      <div className={cn('child-layout', fontBody.variable)}>
        {children}
      </div>
    </div>
  );
}

