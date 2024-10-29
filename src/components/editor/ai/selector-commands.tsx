import {
  ArrowDownWideNarrow,
  CheckCheck,
  RefreshCcwDot,
  StepForward,
  WrapText,
} from "lucide-react"
import { useEditor } from "novel"
import { getPrevText } from "novel/utils"

import {
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"

const options = [
  {
    value: "improve",
    label: "Improve writing",
    icon: RefreshCcwDot,
  },

  {
    value: "fix",
    label: "Fix grammar",
    icon: CheckCheck,
  },
  {
    value: "shorter",
    label: "Make shorter",
    icon: ArrowDownWideNarrow,
  },
  {
    value: "longer",
    label: "Make longer",
    icon: WrapText,
  },
]

interface AISelectorCommandsProps {
  onSelect: (value: string, option: string) => void
}

const AISelectorCommands = ({ onSelect }: AISelectorCommandsProps) => {
  const { editor } = useEditor()

  return (
    <>
      <CommandGroup heading="Edit or review selection">
        {options.map((option) => (
          <CommandItem
            onSelect={(value) => {
              if (editor) {
                const slice = editor.state.selection.content()
                const text = editor.storage.markdown.serializer.serialize(
                  slice.content,
                )
                onSelect(text, value)
              } else {
                console.error("editor is null")
              }
            }}
            className="flex gap-2 px-4"
            key={option.value}
            value={option.value}
          >
            <option.icon className="size-4 text-purple-500" />
            {option.label}
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Use AI to do more">
        <CommandItem
          onSelect={() => {
            if (editor) {
              const pos = editor.state.selection.from

              const text = getPrevText(editor, pos)
              onSelect(text, "continue")
            } else {
              console.error("editor is null")
              return
            }
          }}
          value="continue"
          className="gap-2 px-4"
        >
          <StepForward className="size-4 text-purple-500" />
          Continue writing
        </CommandItem>
      </CommandGroup>
    </>
  )
}

export default AISelectorCommands
