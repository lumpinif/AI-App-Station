type categoryPageProps = {
  params: { category: string }
}

const categoryPage = ({ params }: categoryPageProps) => {
  return <div>{params.category} Page</div>
}

export default categoryPage
