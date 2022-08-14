import { UseFormRegisterReturn } from "react-hook-form";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: "text" | "email" | "password";
  inputStyle?: string;
  className?: string;
  placeHolder?: string;
  registration: Partial<UseFormRegisterReturn>;
  defaultValue?: string;
  reset?: any
};
export const InputField = (props: InputFieldProps) => {
  const { type = "text", label, className, registration, error, placeHolder, defaultValue } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <input type={type}  placeholder={placeHolder}  className={className} {...registration} defaultValue={defaultValue} />
    </FieldWrapper>
  );
};
