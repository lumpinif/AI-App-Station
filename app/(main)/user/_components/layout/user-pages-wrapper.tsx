import { UserPagesBreadCrumb } from "./user-pages-breadcrumb"

type UserPageWrapperProps = { children?: React.ReactNode }

export const UserPagesWrapper: React.FC<UserPageWrapperProps> = ({
  children,
}) => {
  return (
    <>
      <main className="flex h-full w-full flex-col gap-4 overflow-auto py-2">
        <UserPagesBreadCrumb />
        {children}
      </main>
    </>
  )
}
