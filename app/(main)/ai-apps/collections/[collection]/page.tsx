type collectionPageProps = {
  params: { collection: string }
}

const collectionPage = ({ params }: collectionPageProps) => {
  return (
    <div className="sticky top-0 w-full bg-slate-400">{params.collection}</div>
  )
}

export default collectionPage
