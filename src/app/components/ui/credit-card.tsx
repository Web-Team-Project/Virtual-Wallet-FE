"use client";
import Image from "next/image";
import { Tilt } from "react-tilt";
import { Share_Tech_Mono } from "next/font/google";

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
});

export const CreditCard = () => {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-y-1/2 ml-20">
      <Tilt
        options={{ max: 25, scale: 1.05, speed: 400 }}
        className={`${shareTechMono.className} w-[425px] h-[270px] bg-gradient-to-tr rounded-2xl shadow-xl transform transition-transform duration-500 ease-in-out from-[#00C9FF] to-[#92FE9D]`}
      >
        <div className="p-8 w-full h-full relative">
          <div className="relative w-full h-full">
            <Image
              className="absolute top-4 right-4"
              alt="Mastercard Logo"
              src="/mastercard.svg"
              width={70}
              height={24}
            />
            <Image
              className="absolute top-16 left-4"
              alt="Chip Image"
              src="/chip.svg"
              width={60}
              height={30}
            />
            <div className="flex flex-col w-full h-full justify-end gap-4">
              <p className="text-2xl tracking-widest text-white">4402 5532 2021 2887</p>
              <div className="flex justify-between">
                <p className="text-lg uppercase text-white">John Doe</p>
                <p className="text-lg uppercase text-white">03/29</p>
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );
};