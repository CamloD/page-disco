import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'


const inter = Inter({ subsets: ['latin'] })

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})


const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: '--font-jetbrainsMono',
  
  /*
  variable: '--font-body',
  */
})

export default function SecondaryLayout({ children }) {
  return (
    <html lang="es">
      <body className={cn('antialiased', fontHeading.variable, fontBody.variable)} >
        {children}
      </body>
    </html>
  )
}
