"use client"

import { useScrollAndHideNav } from "@/hooks/use-scroll"

import { NavigationMenuBar } from "./navigation-menu-bar"

const FloatingNav = () => {
  const { hideNavOnScroll } = useScrollAndHideNav(30)

  return (
    <header
      className={`fixed top-10 z-40 hidden h-fit max-w-fit transition-all duration-500 ease-in-out sm:block ${
        hideNavOnScroll ? `translate-y-[-150%] opacity-10` : ``
      }`}
    >
      <NavigationMenuBar />
    </header>
  )
}

export default FloatingNav
