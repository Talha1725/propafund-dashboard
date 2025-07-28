import Image from "next/image";
import Container from "../common/container";
import Navbar from "../common/navbar";
import { Button } from "../ui/button";
import hero from "@/public/assets/hero.svg";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden h-[60vh] lg:h-full font-creato-display">
    <Image src={hero} alt="hero" className="w-full h-full object-cover" />
    <div className="absolute top-0 left-0 w-full h-full">
    <Container>
      <Navbar />
      <div className="absolute top-1/2 -translate-y-1/2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold lg:font-normal flex flex-col font-romanica uppercase">
          <span>Your Trading</span>
          <span>Odyssey Begins</span>
        </h1>
        <div className="mt-5 text-xs sm:text-sm md:text-base w-[40%] sm:w-full sm:flex flex-col"><span>Get funded up to <span className="font-bold">$500,000</span> and conquer the</span> <span>markets like a modern-day Spartan.</span></div>
        <div className="mt-6 translate-x-2 flex">
          <Button>Get Funded Now</Button>
        </div>
      </div>
    </Container>
    </div>
   </div>
  );
}