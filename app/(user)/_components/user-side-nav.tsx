"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, ReaderIcon, RocketIcon } from "@radix-ui/react-icons"

export default function UserSideNav() {
  const path = usePathname()

  return (
    <aside className="fixed bottom-0 left-0 top-0 h-screen w-60 border-r  p-5">
      <div>
        <Link href={"/admin"}>
          <h1 className="space-x-3 px-4 text-2xl font-bold uppercase">
            Portfolio
          </h1>
          <h1 className="px-4 text-sm font-normal text-gray-400">ADMIN</h1>
        </Link>
      </div>
      <div className="mt-5">
        <ul>
          <li className="mb-2">
            <Link
              href={"/admin"}
              className={`${
                path === "/admin" ? "bg-gray-100" : ""
              } flex items-center gap-2 rounded px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800`}
            >
              <HomeIcon />
              Home
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href={"/admin/projects"}
              className={`${
                path === "/admin/projects" ? "bg-gray-100" : ""
              } flex items-center gap-2 rounded px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800`}
            >
              <RocketIcon />
              Projects
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href={"/admin/blogs"}
              className={`${
                path === "/admin/blogs" ? "bg-gray-100" : ""
              } flex items-center gap-2 rounded px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800`}
            >
              <ReaderIcon />
              Blogs
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}
