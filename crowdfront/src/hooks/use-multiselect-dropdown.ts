import { useState, useCallback, useEffect, useMemo } from "react"

export type Option = {
  value: string
  label: string
}

export function useMultiselectDropdown(initialOptions: Option[]) {
  const [options, setOptions] = useState<Option[]>(initialOptions)
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300)

  const filteredOptions = useMemo(
    () => options.filter((option) => option.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase())),
    [options, debouncedSearchTerm],
  )

  const toggleOption = useCallback((option: Option) => {
    setSelectedOptions((prev) =>
      prev.some((item) => item.value === option.value)
        ? prev.filter((item) => item.value !== option.value)
        : [...prev, option],
    )
  }, [])

  return {
    options,
    selectedOptions,
    searchTerm,
    setSearchTerm,
    isOpen,
    setIsOpen,
    filteredOptions,
    toggleOption,
  }
}

// Custom hook for debounced value
function useDebouncedValue(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

