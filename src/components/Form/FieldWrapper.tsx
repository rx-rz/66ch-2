import { FieldError } from "react-hook-form";

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  description?: string;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  "className" | "children"
>;
export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, className, error, children } = props;
  return (
    <div>
      <label className={className}>
        {label}
        <div>{children}</div>
      </label>
      {error?.message && (
        <p
          role="alert"
          aria-label={error.message}
          className="text-sm text-red-500"
        >
          {error.message}
        </p>
      )}
    </div>
  );
};
