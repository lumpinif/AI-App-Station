type collectionPageProps = {
  params: { collection: string }
}

const collectionPage = ({ params }: collectionPageProps) => {
  return (
    <>
      <div className="m-2 text-2xl font-bold uppercase">
        {params.collection}
      </div>
    </>
  )
}

export default collectionPage
