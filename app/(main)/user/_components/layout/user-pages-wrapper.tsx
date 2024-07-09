import { UserPagesBreadCrumb } from "./user-pages-breadcrumb"
import { UserPagesTitle } from "./user-pages-title"

type UserPageWrapperProps = { children?: React.ReactNode }

export const UserPagesWrapper: React.FC<UserPageWrapperProps> = ({
  children,
}) => {
  return (
    <main className="flex h-full w-full flex-col gap-4 overflow-auto sm:min-h-[calc(100svh-6rem)] sm:pl-6 xl:pl-8 2xl:pl-10">
      <UserPagesBreadCrumb />

      {children}
    </main>
  )
}
