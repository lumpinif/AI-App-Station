type AppIdSubmitPageProps = {
  params: { slug: string }
}

const AppIdSubmitPage = ({ params }: AppIdSubmitPageProps) => {
  return <div>App ID Page : {params.slug}</div>
}

export default AppIdSubmitPage
