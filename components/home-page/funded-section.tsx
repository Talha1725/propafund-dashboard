import Image from "next/image";
import Container from "../common/container";
import priceStone1 from "@/public/assets/price-stones.svg"
import priceStone2 from "@/public/assets/price-stone-2.svg"

export default function FundedSection() {
  return (
    <div className="font-creato-display py-30">
      <Container>
        <h1 className="text-center font-romanica uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold lg:font-normal">
          From Citizen to Funded Hero
        </h1>
        <p className="text-center mt-3">Our streamlined process transforms skilled traders into funded warriors.</p>

        <div className="grid grid-cols-3 gap-14">
          <div className="p-4 border border-white/10 gradient-dark">
          <Image src={priceStone1} alt="price-stone" className="w-full h-full bg-no-repeat object-cover" />
          </div>
        </div>
      </Container>
    </div>
  );
}
