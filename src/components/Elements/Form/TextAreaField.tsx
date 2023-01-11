import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  placeholder?: string;
  defaultValue?: any;
  onChange?: any;
};

export const TextAreaField = (props: TextAreaFieldProps) => {
  const {
    label,
    className,
    registration,
    error,
    placeholder,
    defaultValue,
    onChange,
  } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <textarea
        /*The classname can be a variant of the available input
         field options or it can have a custom styling based on
          the classname property*/
        className={className}
        /*the options from the register property added to the
         SelectField component when it is called in anotber
          part of the codebase is destructured here. */
        {...registration}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </FieldWrapper>
  );
};
