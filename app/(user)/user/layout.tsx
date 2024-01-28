import UserMainLayout from "../_components/user-layout"

interface UserLayoutProps {
  children: React.ReactNode
}
export default async function UserLayout({ children }: UserLayoutProps) {
  return <UserMainLayout>{children}</UserMainLayout>
}
