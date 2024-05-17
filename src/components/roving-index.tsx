import {
  ComponentProps,
  ComponentPropsWithoutRef,
  createContext,
  ElementType,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react"

type RovingIndexTabItem = {
  id: string
  element: HTMLElement
}

type RovingTabIndexContextType = {
  focusableId: string | null
  setFocusableId: (id: string) => void
  onShiftTab: () => void
  getOrderedItems: () => RovingIndexTabItem[]
  elements: MutableRefObject<Map<string, HTMLElement>>
}

const RovingTabIndexContext = createContext<RovingTabIndexContextType>({
  focusableId: null,
  setFocusableId: () => {},
  onShiftTab: () => {},
  getOrderedItems: () => [],
  elements: { current: new Map() },
})

type RovingTabIndexBaseProps<T extends ElementType> = {
  as?: T
  children: ReactNode | ReactNode[]
}

type RovingTabIndexRootProps<T extends ElementType> =
  RovingTabIndexBaseProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof RovingTabIndexBaseProps<T>>

export function RovingTabIndexRoot<T extends ElementType>({
  children,
  as,
  ...props
}: RovingTabIndexRootProps<T>) {
  const [focusableId, setFocusableId] = useState<string | null>(null)
  const [isShiftTabbing, setIsShiftTabbing] = useState(false)
  const elements = useRef(new Map<string, HTMLElement>())
  const ref = useRef<HTMLDivElement>(null)
  const Component = as || "div"

  const getOrderedItems = useCallback(function () {
    if (!ref.current) return []

    const fromDom = Array.from(
      ref.current.querySelectorAll<HTMLElement>("[data-roving-tabindex-item]"),
    )

    return Array.from(elements.current)
      .sort((a, b) => fromDom.indexOf(a[1]) - fromDom.indexOf(b[1]))
      .map(([id, element]) => ({ id, element }))
  }, [])

  const onShiftTab = useCallback(function () {
    setIsShiftTabbing(true)
  }, [])

  return (
    <RovingTabIndexContext.Provider
      value={{
        focusableId,
        setFocusableId,
        onShiftTab,
        getOrderedItems,
        elements,
      }}
    >
      <Component
        ref={ref}
        tabIndex={isShiftTabbing ? -1 : 0}
        onFocus={(e) => {
          props.onFocus?.(e)
          // return if bubbled from a child
          if (e.target !== e.currentTarget || isShiftTabbing) return
          const orderedElements = getOrderedItems()
          if (orderedElements.length === 0) return

          if (focusableId != null) {
            elements.current.get(focusableId)?.focus()
          } else {
            orderedElements[0].element.focus()
          }
        }}
        onBlur={(e) => {
          props.onBlur?.(e)
          setIsShiftTabbing(false)
        }}
      >
        {children}
      </Component>
    </RovingTabIndexContext.Provider>
  )
}

export function useRovingTabIndex(id: string) {
  const { elements, focusableId, getOrderedItems, onShiftTab, setFocusableId } =
    useContext(RovingTabIndexContext)

  const rovingProps = useCallback(
    function getRovingProps<T extends ElementType>(
      props: ComponentPropsWithoutRef<T>,
    ) {
      return {
        ...props,
        tabindex: focusableId === id ? 0 : -1,
        onMouseDown: (e: MouseEvent) => {
          props.onMouseDown?.(e)
          if (e.target !== e.currentTarget) return
          setFocusableId(id)
        },
        onFocus: (e: FocusEvent) => {
          props.onFocus?.(e)
          if (e.target !== e.currentTarget) return
          setFocusableId(id)
        },
        onKeyDown: (e: KeyboardEvent) => {
          props.onKeyDown?.(e)
          if (e.target !== e.currentTarget) return
          if (e.key === "Tab" && e.shiftKey) {
            onShiftTab()
            return
          }
        },
        ["data-roving-tabindex-item"]: true,
        ref: (element: HTMLElement | null) => {
          if (element) {
            elements.current.set(id, element)
          } else {
            elements.current.delete(id)
          }
        },
      }
    },
    [elements, focusableId, id, onShiftTab, setFocusableId],
  )

  return {
    isFocusable: focusableId === id,
    getRovingProps: rovingProps,
    getOrderedItems,
  }
}
export function getNextFocusableId(
  items: RovingIndexTabItem[],
  id: string,
): RovingIndexTabItem | undefined {
  const currIndex = items.findIndex((item) => item.id === id)
  return items.at(currIndex === items.length - 1 ? 0 : currIndex + 1)
}

export function getPrevFocusableId(
  items: RovingIndexTabItem[],
  id: string,
): RovingIndexTabItem | undefined {
  const currIndex = items.findIndex((item) => item.id === id)
  return items.at(currIndex === 0 ? -1 : currIndex - 1)
}
