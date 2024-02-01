"use client"

import { useCallback, useReducer, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { CheckIcon, ReloadIcon } from "@radix-ui/react-icons"
// import { Editor } from "novel"
import { SubmitHandler, useForm } from "react-hook-form"
import Select, { MultiValue, OptionProps } from "react-select"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Variants = "blog" | "project"

type Inputs = {
  title: string
  content: string
  description: string
  tags: number
  cover_url: string
}

interface BlogFormProps {
  id?: string
  variant?: Variants
  value?: Inputs
}

const blogsTags = [
  {
    label: "HTML",
    value: "HTML",
    name: "HTML",
  },
  {
    label: "CSS",
    value: "CSS",
    name: "CSS",
  },
  {
    label: "JavaScript",
    value: "JavaScript",
    name: "JavaScript",
  },
]

const getDefaultValue = (value: string[]) => {
  if (value.length > 0) {
    return value.map((v) => {
      return {
        label: v,
        name: v,
        value: v,
      }
    })
  }

  return []
}

export default function SubmitForm({
  id,
  value,
  variant = "blog",
}: BlogFormProps) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    defaultValues: {
      title: value?.title || "",
      description: value?.description || "",
      cover_url: value?.cover_url || "",
    },
  })

  const [loading, setLoading] = useState(false)
  const [blogForm, setBlogForm] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next }
    },
    {
      title: value?.title || "",
      content: value?.content || "",
      description: value?.description || "",
      tags: value?.tags || [],
      cover_url: value?.cover_url || "",
    }
  )

  const updateContent = useCallback((data: any) => {
    setBlogForm({ content: data.getJSON() })
  }, [])

  const onSubmitBlog: SubmitHandler<Inputs> = async (data) => {
    let req
    const blogData = {
      title: data?.title || "",
      content: blogForm?.content || "",
      description: data?.description || "",
      tags: blogForm?.tags || [],
      cover_url: blogForm?.cover_url || "",
    }

    setLoading(true)

    if (id) {
      req = await fetch(`/api/blogs?id=${id}`, {
        method: "PATCH",
        headers: {
          "Contet-type": "application/json",
        },
        body: JSON.stringify(blogData),
      })
    } else {
      req = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Contet-type": "application/json",
        },
        body: JSON.stringify(blogData),
      })
    }

    const response = await req.json()

    setLoading(false)

    if (response?.data?.id) {
      router.push("/admin/blogs")
    }
  }

  const onSubmitProject: SubmitHandler<Inputs> = async (data) => {
    let req

    const ProjectData = {
      title: data?.title || "",
      content: blogForm?.content || "",
      description: data?.description || "",
      tags: blogForm?.tags || [],
      cover_url: blogForm?.cover_url || "",
    }

    setLoading(true)

    if (id) {
      req = await fetch(`/api/projects?id=${id}`, {
        method: "PATCH",
        headers: {
          "Contet-type": "application/json",
        },
        body: JSON.stringify(ProjectData),
      })
    } else {
      req = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Contet-type": "application/json",
        },
        body: JSON.stringify(ProjectData),
      })
    }

    const response = await req.json()

    setLoading(false)

    if (response?.data?.id) {
      router.push("/admin/projects")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(
        variant === "blog" ? onSubmitBlog : onSubmitProject
      )}
    >
      <div>
        <Label htmlFor="email" className="capitalize">
          {variant} Title
        </Label>
        <Input
          type="text"
          {...register("title", { required: true })}
          placeholder="Title"
          className={`mt-2 ${errors.title ? "border-red-500 bg-red-100" : ""}`}
        />
        {errors.title && (
          <span className="mt-1 text-sm text-red-500">
            This field is required
          </span>
        )}
      </div>
      <div className="mt-5">
        <Label htmlFor="description" className="capitalize">
          {variant} Description
        </Label>
        <Textarea
          placeholder="Description"
          {...register("description", { required: true })}
          className={`mt-2 ${
            errors.description ? "border-red-500 bg-red-100" : ""
          }`}
        />
        {errors.description && (
          <span className="mt-1 text-sm text-red-500">
            This field is required
          </span>
        )}
      </div>
      <div className="mt-5">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture" className="capitalize">
            {variant} Cover Image
          </Label>
          <div className="max-w-[120px]">
            {blogForm.cover_url && (
              <Image
                src={blogForm.cover_url}
                alt={`${blogForm} cover image`}
                className="h-auto w-full rounded-md"
              />
            )}
          </div>
          <input
            type="hidden"
            value={blogForm.cover_url}
            {...register("cover_url", { required: true })}
          />
          <Input
            id="picture"
            type="file"
            className={`mt-2 ${
              errors.cover_url ? "border-red-500 bg-red-100" : ""
            }`}
            onChange={async (e) => {
              let files = (e.target as HTMLInputElement).files

              if (files && files?.length > 0) {
                const file = files[0]
                const response = await fetch("/api/upload", {
                  method: "POST",
                  headers: {
                    "Content-type": file.type,
                    "X-Vercel-Filename": file.name,
                  },
                  body: file,
                }).then((res) => res.json())

                setBlogForm({
                  cover_url: response.url,
                })
                setValue("cover_url", response.url)
              }
            }}
          />
          {errors.cover_url && (
            <span className="mt-1 text-sm text-red-500">
              This field is required
            </span>
          )}
        </div>
      </div>
      <div className="mt-5">
        <Label htmlFor="content" className="capitalize">
          {variant} Content
        </Label>
        {/* <Editor
          editorProps={{}}
          onDebouncedUpdate={updateContent}
          defaultValue={blogForm.content}
          className="mt-2 rounded border pb-8"
          disableLocalStorage
        /> */}
      </div>
      <div className="mt-4">
        <Label htmlFor="content" className="capitalize">
          {variant} Tags
        </Label>
        <Select
          defaultValue={getDefaultValue(blogForm.tags)}
          isMulti
          name="tags"
          options={blogsTags}
          onChange={(value: MultiValue<{ name: string }>) => {
            if (value && value.length > 0) {
              const tags = value.map((v: { name: string }) => v?.name)

              setBlogForm({ tags: tags })
            }
          }}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
      <div className="mt-4 text-right">
        <Button
          variant={"secondary"}
          onClick={() => {
            variant === "blog"
              ? router.push("/admin/blogs")
              : router.push("/admin/projects")
          }}
        >
          Cancel
        </Button>
        <Button className="ml-5">
          {loading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <>
              <CheckIcon className="mr-2" />
              Save
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
