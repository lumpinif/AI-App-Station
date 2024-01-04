"use client"

import { useScrollAndHideNav } from "@/hooks/use-scroll"

import { NavigationMenuBar } from "./navigation-menu-bar"

const FloatingNav = () => {
  const { hideNavOnScroll } = useScrollAndHideNav(30)

  return (
    <header className="sticky top-0 z-40 mx-auto hidden h-20 max-w-md sm:inline-block md:max-w-fit ">
      <div
        className={`relative flex h-full items-center justify-center transition-all duration-500 ease-in-out
            ${hideNavOnScroll ? `translate-y-[-80%] opacity-10` : ``}
            `}
      >
        <NavigationMenuBar />
      </div>
    </header>
  )
}

export default FloatingNav
