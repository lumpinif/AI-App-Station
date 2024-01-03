import Image from "next/image"
import Link from "next/link"
import logo from "@/public/images/logo_blue.svg"

const Logo = () => {
  return (
    <Link href="/">
      <Image src={logo} alt="Openmindai Logo" width={80} height={80} priority />
    </Link>
  )
}

export default Logo
