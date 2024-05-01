import UserCard from "../../../../../../../components/auth/auth-modal/user-card"

const LeftPanel = () => {
  return (
    <div
      key="left-panel"
      className="flex flex-col justify-between py-6 xl:h-full xl:max-w-sm xl:py-10"
    >
      {/* Top User Card Container */}
      <div>
        <UserCard />

        {/* Buttons Container */}
        {/* <div className="mt-6 flex items-center gap-3">
          <a
            href={`https://www.google.com/maps/place/Kad%C4%B1k%C3%B6y%2F%C4%B0stanbul/@40.981133,29.063053,12z/data=!3m1!4b1!4m6!3m5!1s0x14cac790b17ba89d:0xd2d24ea0437a7ee2!8m2!3d40.981867!4d29.0576302!16zL20vMDV5cWY4?entry=ttu`}
            className="flex w-full items-center gap-2 rounded-md border border-neutral-100 px-4 py-2 text-sm font-medium dark:border-neutral-800"
          >
            <MapPin size="14" />
            Kunming, China
          </a>
          <a
            href={`/#`}
            className="flex w-full items-center gap-2 rounded-md border border-neutral-100 px-4 py-2 text-sm font-medium dark:border-neutral-800"
          >
            <Mail size="14" />
            Contact Me
          </a>
        </div> */}
      </div>
    </div>
  )
}

export default LeftPanel
