import { CategoriesCommandGroup } from "./categories-command-group"
import { CollectionsCommandGroup } from "./collections-command-group"
import { LinksCommandGroup } from "./links-command-group"
import { ProjectsCommandGroup } from "./projects-command-group"
import { ThemeCommandGroup } from "./theme-command-group"

type SearchCommandGroupsProps = {
  runCommand: (callback: () => unknown, isToggleSearchDialog?: boolean) => void
}

export const SearchCommandGroups: React.FC<SearchCommandGroupsProps> = ({
  runCommand,
}) => {
  return (
    <>
      <ProjectsCommandGroup runCommand={runCommand} />
      <LinksCommandGroup runCommand={runCommand} />
      <CollectionsCommandGroup runCommand={runCommand} />
      <CategoriesCommandGroup runCommand={runCommand} />
      <ThemeCommandGroup />
    </>
  )
}
