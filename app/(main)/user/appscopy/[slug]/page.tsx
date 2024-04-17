"use client"

import { useEffect, useReducer } from "react"

import SubmitForm from "../submit/_components/submit-form"

interface ParamProps {
  slug: string
}

interface AppsDetailPageProps {
  params: ParamProps
}

export default function AppsDetailPage({ params }: AppsDetailPageProps) {
  const [response, setResponse] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next }
    },
    {
      loading: true,
      data: {},
    }
  )

  const fetchBlog = async () => {
    const response = await fetch(`/api/projects?id=${params.slug}`).then(
      (res) => res.json()
    )

    setResponse({ data: response.data, loading: false })
  }

  useEffect(() => {
    fetchBlog()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (response.loading) {
    return <h1>Loading...</h1>
  }

  return (
    <SubmitForm id={params.slug} variant="project" value={response?.data} />
  )
}
