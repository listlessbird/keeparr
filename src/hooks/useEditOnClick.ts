import { KeyboardEvent, useCallback, useState } from "react"

type UseEditOnClickOpts = {
  initialValue: string
  onEditStart?: () => void
  onEditEnd?: () => void
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
      onEditEnd()
    }
    setIsEditing(false)
  }, [isEditing, onEditEnd])

  const handleValueChange = useCallback((value: string) => {
    setValue(value)
  }, [])

  const handleEditingOnKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === "Escape") {
        stopEditing()
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
