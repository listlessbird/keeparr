"use client"

import { useState } from "react"
import { useCompletion } from "ai/react"
import { ArrowUp } from "lucide-react"
import { useEditor } from "novel"
import { addAIHighlight } from "novel/extensions"
import Markdown from "react-markdown"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Command, CommandInput } from "@/components/ui/command"
import CrazySpinner from "@/components/ui/icons/crazy-spinner"
import Magic from "@/components/ui/icons/magic"
import { ScrollArea } from "@/components/ui/scroll-area"
import AICompletionCommands from "@/components/editor/ai/completion-command"
import AISelectorCommands from "@/components/editor/ai/selector-commands"

//TODO: I think it makes more sense to create a custom Tiptap extension for this functionality https://tiptap.dev/docs/editor/ai/introduction

interface AISelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AISelector({ onOpenChange }: AISelectorProps) {
  const { editor } = useEditor()
  const [inputValue, setInputValue] = useState("")

  const { completion, complete, isLoading } = useCompletion({
    // id: "novel",
    api: "/api/generate",
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.")
        return
      }
    },
    onError: (e) => {
      toast.error(e.message)
    },
  })

  const hasCompletion = completion.length > 0

  return (
    <Command className="w-[350px]">
      {hasCompletion && (
        <div className="flex max-h-[400px]">
          <ScrollArea>
            <div className="prose prose-sm p-2 px-4">
              <Markdown>{completion}</Markdown>
            </div>
          </ScrollArea>
        </div>
      )}

      {isLoading && (
        <div className="flex h-12 w-full items-center px-4 text-sm font-medium text-muted-foreground text-purple-500">
          <Magic className="mr-2 h-4 w-4 shrink-0  " />
          AI is thinking
          <div className="ml-2 mt-1">
            <CrazySpinner />
          </div>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="relative">
            <CommandInput
              value={inputValue}
              onValueChange={setInputValue}
              autoFocus
              placeholder={
                hasCompletion
                  ? "Tell AI what to do next"
                  : "Ask AI to edit or generate..."
              }
              onFocus={() => {
                if (editor) addAIHighlight(editor)
              }}
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-purple-500 hover:bg-purple-900"
              onClick={() => {
                if (completion)
                  return complete(completion, {
                    body: { option: "zap", command: inputValue },
                  }).then(() => setInputValue(""))

                const slice = editor?.state.selection.content()
                const text = editor?.storage.markdown.serializer.serialize(
                  slice?.content,
                )

                complete(text, {
                  body: { option: "zap", command: inputValue },
                }).then(() => setInputValue(""))
              }}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
          {hasCompletion ? (
            <AICompletionCommands
              onDiscard={() => {
                editor?.chain().unsetHighlight().focus().run()
                onOpenChange(false)
              }}
              completion={completion}
            />
          ) : (
            <AISelectorCommands
              onSelect={(value, option) =>
                complete(value, { body: { option } })
              }
            />
          )}
        </>
      )}
    </Command>
  )
}
