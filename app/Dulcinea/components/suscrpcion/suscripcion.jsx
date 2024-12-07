import React, { useState } from 'react';
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Imagen } from '@/app/components/mostrarmedios';

const SubscriptionModal = ({ isOpen, onClose, onSubscribe }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubscribe(email);
    setEmail('');
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100 z-50' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        className={`w-full sm:max-w-[425px] md:max-w-[800px] lg:max-w-[1200px] translate-y-8 bg-gray-900 text-white rounded-[7px] transition-all duration-300 transform ${
          isOpen ? 'translate-y-8' : 'translate-y-16'
        }`}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="relative flex justify-between items-center">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 -translate-y-12 text-white hover:text-gray-200"
            
          >
            <CloseButton />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="hidden md:block">
            <Imagen
              src="images/image15.jpg"
              alt="Subscription"
              width={540}
              height={400}
              className="object-cover w-full h-[510px] rounded-s-[6px]"
            />
          </div>

          <div className="md:h-[450px] xl:h-[510px] flex flex-col items-start justify-center p-6 rounded-lg">
            <h2 id="modal-title" className="text-2xl font-semibold text-left">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-lg text-gray-500 mb-6 text-left">
              Stay updated with our latest events and promotions!
            </p>
            <form onSubmit={handleSubmit} className="space-y-6 w-full md:w-auto">
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#d4d4d4] border-none focus:ring-[#ff6b6b] focus:ring-2 text-black w-full"
              />
              <Button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-teal-800 hover:bg-teal-900 transition duration-200 rounded-lg"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const CloseButton = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
};

export default SubscriptionModal;
