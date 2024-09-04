import Link from "next/link";

// Components
import Nav from "./Nav";
import MobileNav from "./MobileNav";



const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#1a1a1a] shadow-md text-white">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center justify-center space-x-2" prefetch={false}>
            <Music2Icon className="h-6 w-6" />
              <h1 className="text-2xl font-bold uppercase">Discoteca</h1>
            </Link>
          </div>
          <Nav>
          </Nav>
          {/* Mobile nav */}
            <div className="md:hidden">
                <MobileNav />
            </div>
        </div>
      </header>
    
  )
}
function Music2Icon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="18" r="4" />
        <path d="M12 18V2l7 4" />
      </svg>
    )
  }
export default Header