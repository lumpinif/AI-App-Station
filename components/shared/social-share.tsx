"use client"

import { usePathname } from "next/navigation"
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share"

import { cn, getSiteUrl } from "@/lib/utils"

type SocialShareProps = {
  className?: string
  url: string
  title: string
  description?: string
  slug?: string
}

export const SocialShare: React.FC<SocialShareProps> = ({
  className,
  url: urlProp,
  title,
  description,
  slug,
}) => {
  const pathname = usePathname()
  const WINDOW_W = 950
  const WINDOW_H = 650
  const HASHTAG: string[] = ["AIAppStation", "AI", "Apps"]
  // TODO: DEFINE THIS LATER BEFORE PRODUCTION
  const VIA = ""
  const url =
    !urlProp || urlProp === ""
      ? `${getSiteUrl()}${pathname}` || `${window.location.origin}${pathname}`
      : urlProp

  return (
    <div className={cn("", className)}>
      <TwitterShareButton
        url={url}
        title={title}
        via={VIA}
        hashtags={HASHTAG}
        windowWidth={WINDOW_W}
        windowHeight={WINDOW_H}
      >
        <XIcon size={32} round />
      </TwitterShareButton>
      <FacebookShareButton
        url={url}
        hashtag={`#${HASHTAG[0]}`}
        windowWidth={WINDOW_W}
        windowHeight={WINDOW_H}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <FacebookMessengerShareButton
        url={url}
        appId=""
        windowWidth={WINDOW_W}
        windowHeight={WINDOW_H}
      >
        <FacebookMessengerIcon size={32} round />
      </FacebookMessengerShareButton>
      <WhatsappShareButton
        url={url}
        title={title}
        separator=":: "
        windowWidth={WINDOW_W}
        windowHeight={WINDOW_H}
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <LinkedinShareButton
        url={url}
        title={title}
        summary={description as string}
        source="AI App Station"
        windowWidth={WINDOW_W}
        windowHeight={WINDOW_H}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <RedditShareButton
        url={url}
        title={title}
        windowWidth={WINDOW_W}
        windowHeight={WINDOW_H}
      >
        <RedditIcon size={32} round />
      </RedditShareButton>
      <LineShareButton
        url={url}
        title={title}
        windowWidth={WINDOW_W}
        windowHeight={WINDOW_H}
      >
        <LineIcon size={32} round />
      </LineShareButton>
      <EmailShareButton
        url={url}
        subject={`Check this from AI App Station - ${title}`}
        body={description as string}
        separator=": "
        windowWidth={WINDOW_W}
        windowHeight={WINDOW_H}
      >
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  )
}
