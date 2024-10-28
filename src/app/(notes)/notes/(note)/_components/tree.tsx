import { ChevronRight, Folder, NotebookText } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/app/(notes)/notes/(note)/_components/sidebar"

interface TreeNode {
  name: string
  type: "note" | "folder"
  children: TreeNode[]
}

export function Tree({ node }: { node: TreeNode }) {
  if (node.type === "note") {
    return (
      <SidebarMenuButton>
        <NotebookText className="mr-2 size-4" />
        {node.name}
      </SidebarMenuButton>
    )
  }

  return (
    <SidebarMenuItem>
      <Collapsible className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="mr-2 size-4 transition-transform" />
            <Folder className="mr-2 size-4" />
            {node.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {node.children?.map((child, index) => (
              <Tree key={index} node={child} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}
