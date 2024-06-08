import Link from "next/link"

type SeeAllButtonProps = {
  href: string
}

export const SeeAllButton: React.FC<SeeAllButtonProps> = ({ href }) => {
  return (
    <Link
      href={href}
      className="w-fit text-blue-600 transition-all duration-300 ease-out hover:text-blue-500 active:text-blue-500"
    >
      See All
    </Link>
  )
}
