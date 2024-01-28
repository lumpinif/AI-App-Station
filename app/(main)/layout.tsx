interface MainAppLayout {
  children: React.ReactNode
}

const MainAppLayout = ({ children }: MainAppLayout) => {
  return (
    <>
      <main>{children}</main>
    </>
  )
}

export default MainAppLayout
