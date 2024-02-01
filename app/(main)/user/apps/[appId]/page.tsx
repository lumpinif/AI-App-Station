type SubmitAppIdPageProps = {
  params: { appId: string }
}

const SubmitAppIdPage = ({ params }: SubmitAppIdPageProps) => {
  return <div>App ID Page : {params.appId}</div>
}

export default SubmitAppIdPage
