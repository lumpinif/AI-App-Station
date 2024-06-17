/* eslint-disable tailwindcss/classnames-order */
"use client"

import HeroImage from "./hero/hero-image"

export default function AiAppsPageIntro() {
  return (
    <section
      id="ai-apps page introduction"
      className="container relative mx-auto mt-8 max-w-7xl px-6 text-center sm:mt-40 md:mt-44"
    >
      <h1 className="page-title-font my-20 text-balance text-4xl sm:text-5xl">
        Designed for discovery <br /> by categories and collections.
      </h1>
      <HeroImage />
    </section>
  )
}
