"use client"

import React, { useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoadingFallback from "@/components/shared/loading-fallback"

export function AppsStoriesTabs({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "apps")

  useEffect(() => {
    setActiveTab(searchParams.get("tab") || "apps")
  }, [searchParams])

  const handleTabChange = useCallback(
    (value: string) => {
      setActiveTab(value)
      router.replace(`?tab=${value}`, { scroll: false })
    },
    [router]
  )

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList>
        <TabsTrigger value="apps">Apps</TabsTrigger>
        <TabsTrigger value="stories">Stories</TabsTrigger>
      </TabsList>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.props.value) {
          return (
            <TabsContent
              key={child.props.value}
              value={child.props.value}
              className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              {activeTab === child.props.value ? child : <LoadingFallback />}
            </TabsContent>
          )
        }
        return null
      })}
    </Tabs>
  )
}
