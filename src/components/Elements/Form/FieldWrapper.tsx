import { FieldError } from "react-hook-form";

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined ;
  description?: string;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  "className" | "children"
>;
export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label,  error, children } = props;
  return (
    <div className="mt-8">
      <label className="font-Synonym font-medium md:text-lg text-md pb-1">
        {label}
        <div>{children}</div>
      </label>
      {error?.message && (
        <p
          role="alert"
          aria-label={error?.message}
          className="text-sm font-Amulya font-bold text-red-500"
        >
          {error.message}
        </p>
      )}
    </div>
  );
};
