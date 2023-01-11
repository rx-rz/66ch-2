import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type Option = {
  value: string;
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const SelectField = (props: SelectFieldProps) => {
  const {
    label = "",
    options,
    error,
    className,
    defaultValue,
    registration,
    placeholder,
  } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <select
        placeholder={placeholder}
        name="location"
        /*The classname can be a variant of the available input
         field options or it can have a custom styling based on
          the classname property*/
        className={className}
        defaultValue={defaultValue}
        /*the options from the register property added to the
         SelectField component when it is called in anotber
          part of the codebase is destructured here. */
        {...registration}
      >
        {
          //mapping over the options array
          options.map(({ value }) => (
            // Creating an <option> element for each option
            <option key={value} value={value}>
              {/*displaying the value as text inside the option */}
              {value}
            </option>
          ))
        }
      </select>
    </FieldWrapper>
  );
};
