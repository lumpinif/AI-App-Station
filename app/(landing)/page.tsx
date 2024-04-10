import { UnderlayActionSheet } from "@/components/ui/underlay-action-sheet"
import AccountModalTrigger from "@/components/auth/auth-modal/account-modal-trigger"
import HeroSection from "@/components/landing/HeroSection"

export default function LandingPage() {
  return (
    <>
      <div className="absolute right-4 top-3 sm:hidden">
        <AccountModalTrigger />
      </div>
      <div className="flex flex-col">
        <main className="min-h-dvh flex-1">
          <HeroSection />
          <UnderlayActionSheet />
        </main>
      </div>
    </>
  )
}
