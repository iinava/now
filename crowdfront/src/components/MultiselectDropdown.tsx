import  { useRef, useEffect } from "react"
import { useMultiselectDropdown, type Option } from "../hooks/use-multiselect-dropdown"
import { useDispatch, useSelector } from 'react-redux';
import { fetchLookingForOptions } from '../features/projectSlice';
import { RootState, AppDispatch } from '../store/store';

interface MultiselectDropdownProps {
  options: Option[]
  placeholder?: string
  onChange?: (selectedOptions: Option[]) => void
}

export function MultiselectDropdown({ options, placeholder = "Select items...", onChange }: MultiselectDropdownProps) {
  const dispatch = useDispatch<AppDispatch>();
  const lookingForOptions = useSelector((state: RootState) => state.projects.lookingForOptions);

  const { selectedOptions, searchTerm, setSearchTerm, isOpen, setIsOpen, toggleOption } =
    useMultiselectDropdown(options)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
  

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [setIsOpen])

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        dispatch(fetchLookingForOptions(searchTerm));
      }
    }, 300); // Debounce time in milliseconds

    return () => {
      clearTimeout(handler); // Cleanup the timeout on unmount or when searchTerm 
    };
  }, [searchTerm, dispatch]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedOptions);
    }
  }, [selectedOptions, onChange]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="flex flex-wrap items-center  border border-gray-700 rounded-md p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.length > 0 ? (
          selectedOptions.map((option) => (
            <span
              key={option.value}
              className="text-yellow-200 bg-lime-100/20 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-[20px]"
            >
              {option.label}
            </span>
          ))
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-black border border-gray-700 rounded-md shadow-lg">
          <div className="p-2">
            <input
              type="text"
              className="w-full p-2 bg-black text-white border border-gray-600 rounded-md placeholder-gray-400"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul className="max-h-60 overflow-auto">
            {lookingForOptions.length > 0 ? (
              lookingForOptions.map((option) => (
                <li
                  key={option.value}
                  className= "px-4 py-2 cursor-pointer hover:bg-gray"
                  onClick={() => toggleOption(option)}
                >
                  <div className="flex items-center text-white">
                    <span className="flex-grow">{option.label}</span>
                    {selectedOptions.some((item) => item.value === option.value) && (
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-white">
                <span className="text-gray-400">No options available</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

