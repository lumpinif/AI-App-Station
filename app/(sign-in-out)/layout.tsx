import PageTransition from "@/components/shared/page-transition"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageTransition>
      <section>{children}</section>
    </PageTransition>
  )
}
