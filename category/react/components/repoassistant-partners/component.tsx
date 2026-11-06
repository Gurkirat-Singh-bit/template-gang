import asset0 from "./assets/logo-lemonade.svg";
import asset1 from "./assets/logo-layer.svg";
import asset2 from "./assets/logo-south.svg";
import asset3 from "./assets/logo-quartzy.svg";
import asset4 from "./assets/logo-lot98.svg";
import Image from "next/image";
const partners = [
  { name: "Lemonade", logo: asset0.src },
  { name: "Layer", logo: asset1.src },
  { name: "South", logo: asset2.src },
  { name: "Quartzy", logo: asset3.src },
  { name: "Lot98", logo: asset4.src },
];
export function Partners() {
  return (
    <section className="bg-white rounded-xl px-3 py-12 lg:py-25">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-10 sm:mb-14">
          <p className="font-mono text-sm uppercase text-neutral-500 mb-3">
            Partners
          </p>
          <h2 className="text-3xl -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14 mb-4">
            Next-Generation AI Platform
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-8 lg:gap-14">
          {partners.map((partner) => (
            <Image
              key={partner.name}
              src={partner.logo}
              alt={partner.name}
              width={140}
              height={37}
              className="opacity-60 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
