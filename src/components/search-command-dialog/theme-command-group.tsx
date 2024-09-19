import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { CommandGroup, CommandItem } from "../ui/command"

type ThemeCommandGroupProps = {}

export const ThemeCommandGroup: React.FC<ThemeCommandGroupProps> = ({}) => {
  const { setTheme } = useTheme()
  return (
    <CommandGroup heading="Theme">
      <CommandItem onSelect={() => setTheme("light")}>
        <SunIcon className="mr-2 h-4 w-4 text-muted-foreground md:mr-4" />
        Light
      </CommandItem>
      <CommandItem onSelect={() => setTheme("dark")}>
        <MoonIcon className="mr-2 h-4 w-4 text-muted-foreground md:mr-4" />
        Dark
      </CommandItem>
      <CommandItem onSelect={() => setTheme("system")}>
        <LaptopIcon className="mr-2 h-4 w-4 text-muted-foreground md:mr-4" />
        System
      </CommandItem>
    </CommandGroup>
  )
}
