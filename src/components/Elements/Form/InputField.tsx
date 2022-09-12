import { UseFormRegisterReturn } from "react-hook-form";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

const variants = {
  authField:
    " border-tertiary w-full border p-2  bg-primary focus:bg-white mt-2 font-hind text-black",
  updateField:
    " border-tertiary w-full border p-1  bg-primary  focus:bg-white mt-2 text-black font-hind",
};

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: "text" | "email" | "password";
  className?: string;
  placeHolder?: string;
  registration: Partial<UseFormRegisterReturn>;
  defaultValue?: string;
  variant?: keyof typeof variants;
};

export const InputField = (props: InputFieldProps) => {
  const {
    type = "text",
    label,
    className,
    registration,
    error,
    variant,
    placeHolder,
    defaultValue,
  } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        placeholder={placeHolder}
        className={variants[variant!] ?? className}
        {...registration}
        defaultValue={defaultValue}
      />
    </FieldWrapper>
  );
};
