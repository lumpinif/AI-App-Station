import FloatingNav from "./floating-nav"
import MobileNav from "./mobile-nav"

const LandingPageFloatingNav = () => {
  return (
    <header className="relative max-w-full">
      <header className="flex items-center justify-center">
        <MobileNav />
        <FloatingNav />
      </header>
    </header>
  )
}

export async function LandingPageHeader() {
  return <LandingPageFloatingNav />
}
