import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type BentoCardProps = {
  id: string
  title: string
  category: string
}
export function BentoCard({ id, title, category }: BentoCardProps) {
  return (
    <Card className="relative w-[350px] overflow-hidden">
      <CardHeader className="">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{category}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src="/images/Firosnv Photography Unsplash.jpg"
          alt=""
          width={200}
          height={200}
          className="inset-0 z-0 h-full w-full object-cover"
        />
      </CardContent>
      <CardFooter className="flex justify-between">{id}</CardFooter>
    </Card>
  )
}
