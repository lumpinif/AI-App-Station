import { useRef } from "react"
import Image from "next/image"
import { useInView } from "framer-motion"

const HeroImage = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div
      ref={ref}
      className="relative mt-20 animate-magic-fade-up opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)] sm:mt-40 md:mt-80"
    >
      <div
        className={`rounded-xl border border-white/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:opacity-0 before:[background-image:linear-gradient(to_bottom,var(--color-one),var(--color-one),transparent_40%)] before:[filter:blur(180px)] ${
          inView ? "before:animate-image-glow" : ""
        }`}
      >
        <Image
          width={1200}
          height={600}
          alt="Hero Image"
          src="/hero-dark.png"
          className="relative hidden h-full w-full rounded-[inherit] border object-contain dark:block"
        />
        <Image
          width={1200}
          height={600}
          alt="Hero Image"
          src="/hero-light.png"
          className="relative block h-full w-full rounded-[inherit] border object-contain dark:hidden"
        />
      </div>
    </div>
  )
}

export default HeroImage
