"use client"

import { useScroll } from "@/hooks/use-scroll"

import { NavigationMenuBar } from "./navigation-menu-bar"

const FloatingNav = () => {
  const { hideNavOnScroll } = useScroll(20)

  return (
    <header
      className={`fixed top-6 z-50 hidden h-fit max-w-fit transition-all duration-500 ease-in-out md:block ${
        hideNavOnScroll ? `translate-y-[-150%] opacity-0` : ``
      }`}
    >
      <NavigationMenuBar />
    </header>
  )
}

export default FloatingNav
