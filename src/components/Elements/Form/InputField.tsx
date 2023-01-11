import { UseFormRegisterReturn } from "react-hook-form";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

const variants = {
  authField:
    " border-tertiary w-full rounded-md border p-2 focus:outline-none focus:border-secondary focus:border-2  bg-primary focus:bg-white mt-2 font-hind text-black",
  updateField:
    " border-tertiary w-full border p-1  bg-primary  focus:bg-white mt-2 text-black font-hind",
};

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: "text" | "email" | "password";
  className?: string;
  placeHolder?: string;
  /*the registration prop uses all of useFormRegisterReturn's type 
   and makes all the props optional. You can read more on the Partial
   utility type in the Typescript docs.*/
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
        /*The classname can be a variant of the available input
         field options or it can have a custom styling based on
          the classname property*/
        className={variants[variant!] ?? className}
        /*the options from the register property added to the
         SelectField component when it is called in anotber
          part of the codebase is destructured here. */
        {...registration}
        defaultValue={defaultValue}
      />
    </FieldWrapper>
  );
};
