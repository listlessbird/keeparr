import { KeyboardEvent, useCallback, useState } from "react"

type UseEditOnClickOpts = {
  initialValue: string
  onEditStart?: () => void
  onEditEnd?: (val: string) => void
}

type UseEditOnClickReturn = {
  isEditing: boolean
  value: string
  handleValueChange: (value: string) => void
  handleEditingOnKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void
  startEditing: () => void
  stopEditing: () => void
}

export function useEditOnClick({
  initialValue,
  onEditStart = () => {},
  onEditEnd = () => {},
}: UseEditOnClickOpts): UseEditOnClickReturn {
  const [value, setValue] = useState(initialValue)

  const [isEditing, setIsEditing] = useState(false)

  const startEditing = useCallback(() => {
    if (!isEditing && onEditStart) {
      onEditStart()
    }
    setIsEditing(true)
  }, [isEditing, onEditStart])

  const stopEditing = useCallback(() => {
    if (isEditing && onEditEnd) {
      onEditEnd(value)
    }
    setIsEditing(false)
  }, [isEditing, onEditEnd, value])

  const handleValueChange = useCallback((value: string) => {
    setValue(value)
  }, [])

  const handleEditingOnKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      console.log("Key pressed", e.key, e.code)
      if (e.key === "Enter" || e.key === "Escape") {
        stopEditing()
      }
      // this is manually needed until i fix how the input for filetree is handled :(
      if (e.key === " ") {
        setValue((val) => val + " ")
      }
    },
    [stopEditing],
  )

  return {
    value,
    isEditing,
    startEditing,
    stopEditing,
    handleEditingOnKeyPress,
    handleValueChange,
  }
}
