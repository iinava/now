import { useState, useCallback, useEffect, useMemo } from "react"
import debounce from "lodash.debounce"

export type Option = {
  value: string
  label: string
}

export function useMultiselectDropdown(initialOptions: Option[]) {
  const [options, setOptions] = useState<Option[]>(initialOptions)
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const debouncedSetSearch = useMemo(() => debounce((value: string) => setDebouncedSearchTerm(value), 300), [])

  useEffect(() => {
    debouncedSetSearch(searchTerm)
    return () => {
      debouncedSetSearch.cancel()
    }
  }, [searchTerm, debouncedSetSearch])

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

  const addNewOption = useCallback((newOptionLabel: string) => {
    const newOption = { value: newOptionLabel.toLowerCase(), label: newOptionLabel }
    setOptions((prev) => [...prev, newOption])
    setSelectedOptions((prev) => [...prev, newOption])
    setSearchTerm("")
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
    addNewOption,
  }
}

