import Link from "next/link"

export default function UserPage() {
  return (
    <div className="">
      <Link href={"/user/apps"}>
        <div className="text-xl font-semibold">Submitted Apps </div>
      </Link>
      <div className="py-6 pr-6"></div>
    </div>
  )
}
