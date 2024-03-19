import DiscoverPageTitle from "./_components/discover-page-title"

interface DiscoverPageLayoutProps {
  children: React.ReactNode
}
export default async function DiscoverPageLayout({
  children,
}: DiscoverPageLayoutProps) {
  return (
    <>
      <div className="container">
        <DiscoverPageTitle />
      </div>
      <main className="container">{children}</main>
    </>
  )
}
