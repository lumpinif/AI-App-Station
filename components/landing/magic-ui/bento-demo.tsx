"use client"

import Image from "next/image"
import { CalendarIcon, FileTextIcon, InputIcon } from "@radix-ui/react-icons"
import { Share2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import { BentoCard, BentoGrid } from "./bento-grid"
import Marquee from "./marquee"

interface Item {
  name: string
  description: string
  icon: string
  color: string
  time: string
}

let notifications = [
  {
    name: "Payment received",
    description: "Magic UI",
    time: "15m ago",

    icon: "💸",
    color: "#00C9A7",
  },
  {
    name: "User signed up",
    description: "Magic UI",
    time: "10m ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "New message",
    description: "Magic UI",
    time: "5m ago",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "New event",
    description: "Magic UI",
    time: "2m ago",
    icon: "🗞️",
    color: "#1E86FF",
  },
]

notifications = Array.from({ length: 10 }, () => notifications).flat()

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  )
}

const features = [
  {
    Icon: FileTextIcon,
    name: "AI News of the day",
    description: "Daily updated AI news written by AI experts.",
    href: "/#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      // <div className="relative size-full">
      //   <video
      //     muted
      //     autoPlay
      //     loop
      //     playsInline
      //     src="/screenshots/recording-of-ai-news-of-the-day.mp4"
      //     className="h-full w-full object-cover"
      //   ></video>
      // </div>
      <div className="absolute -top-20 left-5 -z-10 h-3/4 w-full transition-all duration-300 ease-out group-hover:-top-24 group-hover:left-10">
        <Image
          fill
          alt="AI news of the day screenshot"
          src={"/screenshots/daily-post-dark.png"}
          className="rounded-2xl object-cover object-left-bottom brightness-75"
        />
      </div>
    ),
  },
  {
    Icon: FileTextIcon,
    name: "Today page",
    description: "Your personal AI news and apps dashboard.",
    href: "/#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="group-hover:left-15 absolute -top-12 left-20 -z-10 size-[90%] transition-all duration-300 ease-out group-hover:-top-20">
        <Image
          fill
          alt="AI news of the day screenshot"
          src={"/screenshots/today-page-dark.png"}
          className="hidden rounded-2xl object-cover object-bottom brightness-75 dark:block"
        />
        <Image
          fill
          alt="AI news of the day screenshot"
          src={"/screenshots/today-page-light.png"}
          className="z-auto rounded-2xl object-cover object-bottom dark:hidden"
        />
      </div>
    ),
  },
  {
    Icon: Share2Icon,
    name: "App of the day",
    description: "Daily updated with careful selection.",
    href: "/#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      // <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
      <div className="absolute -right-10 -top-14 -z-10 size-4/5 transition-all duration-300 ease-out group-hover:-right-5 group-hover:-top-10">
        <Image
          fill
          alt="App of the day screenshot"
          src={"/screenshots/app-of-the-day-dark.png"}
          className="rounded-2xl object-cover object-bottom brightness-75"
        />
      </div>
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Pick a date",
    href: "/",
    description: "Pick a date to rewind the AI news and apps",
    className: "col-span-3 lg:col-span-1",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute -left-5 top-10 -z-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      />
    ),
  },
]

export function BentoDemo() {
  return (
    <BentoGrid className="container max-w-4xl">
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  )
}
