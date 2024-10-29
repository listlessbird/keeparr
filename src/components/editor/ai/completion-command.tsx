import { Check, TextQuote, TrashIcon } from "lucide-react"
import { useEditor } from "novel"

import {
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"

const AICompletionCommands = ({
  completion,
  onDiscard,
}: {
  completion: string
  onDiscard: () => void
}) => {
  const { editor } = useEditor()
  return (
    <>
      <CommandGroup>
        <CommandItem
          className="gap-2 px-4"
          value="replace"
          onSelect={() => {
            const selection = editor?.view.state.selection

            editor
              ?.chain()
              .focus()
              .insertContentAt(
                {
                  from: selection?.from,
                  to: selection?.to,
                },
                completion,
              )
              .run()
          }}
        >
          <Check className="size-4 text-muted-foreground" />
          Replace selection
        </CommandItem>
        <CommandItem
          className="gap-2 px-4"
          value="insert"
          onSelect={() => {
            const selection = editor.view.state.selection
            editor
              .chain()
              .focus()
              .insertContentAt(selection.to + 1, completion)
              .run()
          }}
        >
          <TextQuote className="size-4 text-muted-foreground" />
          Insert below
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />

      <CommandGroup>
        <CommandItem onSelect={onDiscard} value="thrash" className="gap-2 px-4">
          <TrashIcon className="size-4 text-muted-foreground" />
          Discard
        </CommandItem>
      </CommandGroup>
    </>
  )
}

export default AICompletionCommands
