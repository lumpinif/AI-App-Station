type AppSubInfoFormProps = {}

export const AppSubInfoForm: React.FC<AppSubInfoFormProps> = ({}) => {
  return (
    <section className="w-full flex-col space-y-2">
      <h1
        className="w-fit text-lg font-semibold hover:cursor-pointer sm:text-2xl"
        // onClick={toggleEdit}
      >
        Other Information
      </h1>
    </section>
  )
}
