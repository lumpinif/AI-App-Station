import Link from "next/link"

export default function DashboardPagePage() {
  return (
    <div className="p-6">
      <Link href={"/user/apps"}>
        <div className="text-xl font-semibold">Submitted Apps </div>
      </Link>
      <div className="py-6 pr-6">
        <hr />
      </div>
    </div>
  )
}
