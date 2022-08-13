import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  placeholder?: string;
  reset?: any
  defaultValue?: any
  onChange?: any
};

export const TextAreaField = (props: TextAreaFieldProps) => {
  
  const { label, className, registration, error, placeholder, reset , defaultValue, onChange} = props;
  return (
    <FieldWrapper label={label} error={error}>
      <textarea className={className} {...registration} placeholder={placeholder} defaultValue={defaultValue} onChange={onChange}/>
    </FieldWrapper>
  );
};
