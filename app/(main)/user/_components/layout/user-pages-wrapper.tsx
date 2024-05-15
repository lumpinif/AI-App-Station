import { UserPagesBreadCrumb } from "./user-pages-breadcrumb"
import { UserPagesTitle } from "./user-pages-title"

type UserPageWrapperProps = { children?: React.ReactNode }

export const UserPagesWrapper: React.FC<UserPageWrapperProps> = ({
  children,
}) => {
  return (
    <main className="flex w-full flex-col gap-4 sm:pl-6 xl:pl-8 2xl:pl-10">
      <UserPagesBreadCrumb />

      <UserPagesTitle className="text-2xl font-semibold sm:text-3xl md:text-4xl" />

      <main className="grid flex-1 items-start gap-4 sm:gap-6 md:gap-8">
        {children}
      </main>
    </main>
  )
}
