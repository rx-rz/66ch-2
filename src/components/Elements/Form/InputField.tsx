import { UseFormRegisterReturn } from "react-hook-form";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: "text" | "email" | "password";
  inputStyle?: string;
  className?: string;
  placeHolder?: string;
  registration: Partial<UseFormRegisterReturn>;
};
export const InputField = (props: InputFieldProps) => {
  const { type = "text", label, className, registration, error, placeHolder } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <input type={type}  placeholder={placeHolder} className={className} {...registration}/>
    </FieldWrapper>
  );
};
