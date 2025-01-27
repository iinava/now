import { useState, useCallback } from "react";
import Select, { MultiValue } from "react-select";
import debounce from "lodash.debounce";
import { useAppDispatch } from "@/store/store";
import { fetchLookingForOptions } from "@/features/projectSlice";

interface PositionOption {
  value: number;
  label: string;
}

const PositionMultiSelect = ({ onChange }: { onChange: (ids: number[]) => void }) => {
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<PositionOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debounced search for positions
  const loadOptions = useCallback(
    debounce(async (inputValue: string) => {
      setIsLoading(true);
      try {
        const response: any = await dispatch(fetchLookingForOptions(inputValue)).unwrap();
        const formattedOptions = response?.map((item: any) => ({
          value: item.id,
          label: item.position,
        }));
        setOptions(formattedOptions || []);
      } catch (error) {
        console.error("Error fetching options:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [dispatch]
  );

  const handleInputChange = (inputValue: string) => {
    if (inputValue.trim().length > 0) {
      loadOptions(inputValue);
    }
  };

  const handleChange = (selected: MultiValue<PositionOption>) => {
    const ids = selected.map((item) => item.value);
    onChange(ids);
  };

  return (
    <Select
      isMulti
      options={options}
      isLoading={isLoading}
      onInputChange={handleInputChange} // Triggered when the user types in the input
      onChange={handleChange} // Triggered when options are selected
      placeholder="Search and select positions"
      noOptionsMessage={() => "Type to search positions"}
    />
  );
};

export default PositionMultiSelect;
