type collectionPageProps = {
  params: { collection: string }
}

const collectionPage = ({ params }: collectionPageProps) => {
  return <div>{params.collection} Page</div>
}

export default collectionPage
