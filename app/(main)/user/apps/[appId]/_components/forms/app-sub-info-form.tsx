type AppSubInfoFormProps = {}

export const AppSubInfoForm: React.FC<AppSubInfoFormProps> = ({}) => {
  return (
    <section className="w-full flex-col space-y-2">
      <h1
        className="w-fit text-2xl font-semibold tracking-wide hover:cursor-pointer"
        // onClick={toggleEdit}
      >
        More about this app
      </h1>
    </section>
  )
}
