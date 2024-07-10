import { useEditOnClick } from "@/hooks/useEditOnClick"
import { Input, InputProps } from "@/components/ui/input"

export function ClickToEdit({
  initialValue,
  onEditStart,
  onEditEnd,
  renderReader,
  ...rest
}: {
  initialValue: string
  onEditStart?: () => void
  onEditEnd?: (val: string) => void
  renderReader: (value: string, startEditing: () => void) => JSX.Element
} & Omit<InputProps, "value" | "onChange" | "onKeyDown" | "autoFocus">) {
  const {
    value,
    isEditing,
    handleEditingOnKeyPress,
    handleValueChange,
    startEditing,
    stopEditing,
  } = useEditOnClick({
    initialValue,
    onEditStart,
    onEditEnd,
  })

  return (
    <>
      {isEditing ? (
        <Input
          {...rest}
          type="text"
          value={value}
          onChange={(e) => handleValueChange(e.target.value)}
          onKeyDown={handleEditingOnKeyPress}
          onBlur={(e) => {
            stopEditing()
            rest.onBlur?.(e)
          }}
          autoFocus
          className="h-auto rounded-none border-x-0 border-b-2 border-t-0 bg-transparent focus-visible:ring-transparent"
        />
      ) : (
        renderReader(value, startEditing)
      )}
    </>
  )
}
