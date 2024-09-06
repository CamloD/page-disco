"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const Reservation = () => {
  return (
    <div>

        <section id="reservations" className="py-12 md:py-24 bg-[#1f1f1f] h-[100vh]">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Make a Reservation</h2>
            <form className="max-w-md mx-auto grid gap-4 text-black">
              <Input
                type="text"
                placeholder="Name"
                className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
              />
              <Input
                type="email"
                placeholder="Email"
                className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
              />
              <Input
                type="tel"
                placeholder="Phone"
                className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
              />
              <Textarea
                placeholder="Special Requests"
                className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
              />
              <Button type="submit" className = " bg-teal-800 hover:bg-teal-900">
                Submit Reservation
              </Button>
            </form>
          </div>
        </section>


    </div>
  )
}

export default Reservation