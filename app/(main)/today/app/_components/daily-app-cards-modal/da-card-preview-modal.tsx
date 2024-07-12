import { DailyApp, DailyPost } from "@/types/db_tables"
import { AverageColor } from "@/lib/get-average-color-on-server"
import ResponsiveContentModal from "@/components/shared/responsive-content-modal"

import { ActiveDACard } from "./active-da-card"

type DACardPreviewModalProps = {
  isOpen: boolean
  dailyApp: DailyApp
  averageColor: AverageColor
  onChange: (open: boolean) => void
  screenshotsPublicUrls?: string[]
}

export const DACardPreviewModal: React.FC<DACardPreviewModalProps> = ({
  isOpen,
  onChange,
  dailyApp,
  averageColor,
  screenshotsPublicUrls,
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
      <ActiveDACard
        color={averageColor}
        onChange={onChange}
        dailyApp={dailyApp}
        app_card_title="App of the Day"
        screenshotsPublicUrls={screenshotsPublicUrls}
      />
    </ResponsiveContentModal>
  )
}
