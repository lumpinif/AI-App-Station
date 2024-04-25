// import NovelAdvancedEditor from "@/components/novel-editor/advanced-editor"

type AppIntroductionFormProps = {}

export const AppIntroductionForm: React.FC<AppIntroductionFormProps> = ({}) => {
  return (
    <section className="w-full flex-col space-y-2">
      <h1
        className="w-fit text-2xl font-semibold tracking-wide hover:cursor-pointer"
        // onClick={toggleEdit}
      >
        App Introduction
      </h1>
      {/* <NovelAdvancedEditor /> */}
    </section>
  )
}
