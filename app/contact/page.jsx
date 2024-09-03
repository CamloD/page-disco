"use client"

/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


const Contact = () => {
  return (
      <div className='flex-1'>
        <section id="contact" className="py-16 h-[90vh] bg-[#1a1a1a] ">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-white">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-white">
                <div className="flex items-center space-x-4 mb-6">
                  <PhoneIcon className="w-6 h-6" />
                  <span>+57 (123) 456-7890</span>
                </div>
                <div className="flex items-center space-x-4 mb-6">
                  <MailIcon className="w-6 h-6" />
                  <span>info@discoteca.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <LocateIcon className="w-6 h-6" />
                  <span> 1234, Anywhere Medellin, Colombia</span>
                </div>
              </div>
              <div>
                <form id="reservation" className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Name"
                    className="w-full bg-[#d4d4d4] border-none focus:ring-[#ff6b6b] focus:ring-2 text-black"
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-[#d4d4d4] border-none focus:ring-[#ff6b6b] focus:ring-2 text-black"
                  />
                  <Textarea
                    placeholder="Message"
                    className="w-full bg-[#d4d4d4] border-none focus:ring-[#ff6b6b] focus:ring-2 text-black"
                  />
                  <Button type="submit" className="w-full bg-teal-800 hover:bg-teal-900">
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
  )
}

function LocateIcon(props) {
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
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  )
}


function MailIcon(props) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function PhoneIcon(props) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
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

export default Contact