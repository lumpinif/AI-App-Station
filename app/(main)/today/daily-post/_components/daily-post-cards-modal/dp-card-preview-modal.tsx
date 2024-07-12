import { DailyPost } from "@/types/db_tables"
import { AverageColor } from "@/lib/get-average-color-on-server"
import ResponsiveContentModal from "@/components/shared/responsive-content-modal"

import { ActiveDPCard } from "./active-dp-card"

type DPCardPreviewModalProps = {
  isOpen: boolean
  dailyPost: DailyPost
  averageColor: AverageColor
  onChange: (open: boolean) => void
}

export const DPCardPreviewModal: React.FC<DPCardPreviewModalProps> = ({
  isOpen,
  onChange,
  dailyPost,
  averageColor,
}) => {
  return (
    <ResponsiveContentModal
      isOpen={isOpen}
      onChange={onChange}
      drawerHeight="h-[99%]"
      title="AI News of the Day"
      shouldScaleBackground={true}
      drawerContentClassName="outline-none rounded-t-3xl p-0"
      dialogContentClassName="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl rounded-2xl border-0 outline-none p-0"
    >
      <ActiveDPCard
        color={averageColor}
        onChange={onChange}
        dailyPost={dailyPost}
        post_card_title="AI News of the Day"
      />
    </ResponsiveContentModal>
  )
}
