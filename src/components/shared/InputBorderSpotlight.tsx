"use client"

import { forwardRef, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string
}

export const InputBorderSpotlight = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      type,
      children,
      onChange,
      className,
      placeholder,
      defaultValue,
      ...props
    }: InputProps,
    ref
  ) => {
    const divRef = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [opacity, setOpacity] = useState(0)

    const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
      if (!divRef.current || isFocused) return

      const div = divRef.current
      const rect = div.getBoundingClientRect()

      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    const handleFocus = () => {
      setIsFocused(true)
      setOpacity(1)
    }

    const handleBlur = () => {
      setIsFocused(false)
      setOpacity(0)
    }

    const handleMouseEnter = () => {
      setOpacity(1)
    }

    const handleMouseLeave = () => {
      setOpacity(0)
    }

    return (
      <>
        <div className="relative">
          <input
            ref={ref}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // autoComplete="off"
            placeholder={placeholder}
            type={type}
            name={name}
            className={cn(
              "h-10 w-full cursor-default rounded-md border border-input bg-background p-3.5 transition-colors duration-500 placeholder:select-none focus:border-blue-600 focus:outline-none disabled:text-muted-foreground dark:bg-input",
              className
            )}
            onChange={onChange}
            defaultValue={defaultValue}
            disabled={props.disabled}
          />
          <input
            ref={divRef}
            disabled
            style={{
              border: "1px solid",
              opacity,
              WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
            }}
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute left-0 top-0 z-10 h-10 w-full cursor-default rounded-md border border-blue-600 bg-transparent p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none",
              className
            )}
          />
          {children}
        </div>
      </>
    )
  }
)

InputBorderSpotlight.displayName = "InputBorderSpotlight"
