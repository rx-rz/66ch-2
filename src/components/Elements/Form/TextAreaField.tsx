import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  placeholder?: string
};

const handleKeyDown = (e: any) => {
  e.target.style.height = "inherit";
  e.target.style.height = `${e.target.scrollHeight + 30}px`;
};

export const TextAreaField = (props: TextAreaFieldProps) => {
  
  const { label, className, registration, error, placeholder } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <textarea className={className} {...registration} placeholder={placeholder} onKeyDown={handleKeyDown}/>
    </FieldWrapper>
  );
};
