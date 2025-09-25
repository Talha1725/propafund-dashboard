import Image from "next/image";
import Container from "../common/container";
import Navbar from "../common/navbar";
import { Button } from "../ui/button";
import hero from "@/public/assets/hero.svg";
import { HeroSectionProps } from "@/types/hero";

export default function HeroSection({ 
  image = hero,
  title = "Your Trading Odyssey Begins",
  titleLine1,
  titleLine2,
  subtitle = "Get funded up to $500,000 and conquer the markets like a modern-day Spartan.",
  showButton = true,
  buttonText = "Get Funded Now",
  buttonLink = "/challenges",
  isHomepage = true
}: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden h-[60vh] lg:h-full font-creato-display">
      <Image src={image} alt="hero" className="w-full h-full object-cover" />
      <div className="absolute top-0 left-0 w-full h-full">
        <Container>
          <Navbar />
          <div className={`absolute top-1/2 -translate-y-1/2 ${isHomepage ? '' : 'left-1/2 -translate-x-1/2 w-full'}`}>
            <div className={isHomepage ? '' : 'text-center'}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold lg:font-normal flex flex-col font-romanica uppercase">
                {isHomepage ? (
                  <>
                    <span>Your Trading</span>
                    <span>Odyssey Begins</span>
                  </>
                ) : (
                  <>
                    <span>{titleLine1 || title}</span>
                    <span>{titleLine2 || ""}</span>
                  </>
                )}
              </h1>
              {subtitle && (
                <div className={`mt-5 text-xs sm:text-sm md:text-base ${isHomepage ? 'w-[40%] sm:w-full sm:flex flex-col' : 'max-w-2xl mx-auto'}`}>
                  {isHomepage ? (
                    <>
                      <span>Get funded up to <span className="font-bold">$500,000</span> and conquer the</span>
                      <span>markets like a modern-day Spartan.</span>
                    </>
                  ) : (
                    subtitle
                  )}
                </div>
              )}
              {showButton && (
                <div className="mt-6 translate-x-2 flex">
                  <Button>
                    <a href={buttonLink}>{buttonText}</a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}