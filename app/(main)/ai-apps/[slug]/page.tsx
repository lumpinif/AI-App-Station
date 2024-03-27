export default function AppPagePage({ params }: { params: { slug: string } }) {
  return (
    <h1>
      Welcome to <span className="underline">{params.slug}</span> AppPagepage!{" "}
    </h1>
  )
}
