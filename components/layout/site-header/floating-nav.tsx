"use client"

import { useScrollAndHideNav } from "@/hooks/use-scroll"

import { NavigationMenuBar } from "./navigation-menu-bar"

const FloatingNav = () => {
  const { hideNavOnScroll } = useScrollAndHideNav(30)

  return (
    <header className="fixed inset-x-1/2 top-0 z-40 h-20 translate-x-[-50%]">
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
