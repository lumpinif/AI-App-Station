import Link from "next/link"

import { Dashboard } from "./_components/user-page/dashboard"

export default function UserPage() {
  return (
    <main className="sm:pl-6 xl:pl-8 2xl:pl-10">
      <Dashboard />
    </main>
  )
}
