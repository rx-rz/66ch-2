import { FieldError } from "react-hook-form";

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
};

export type FieldWrapperPassThroughProps =
  /*taking FieldWrapperProps and removing the classname an children
props to create a new component. You can read more on the Omit Utility
Type in the Typescript doc. */
  Omit<FieldWrapperProps, "className" | "children">;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, error, children } = props;
  return (
    <div className="mt-4">
      {
        //Checking if the current URL path is not "/createpost"
        window.location.pathname !== "/createpost" ? (
          // If it's not, then the text color is tertiary
          <label
            className="font-Synonym font-medium text-tertiary
       md:text-lg text-md pb-1 font-pilcrow "
          >
            {label}
            <div>{children}</div>
          </label>
        ) : (
          // If it is, then the text color is primary
          <label
            className="font-Synonym text-primary font-medium
       md:text-lg text-md pb-1 font-pilcrow "
          >
            {label}
            <div>{children}</div>
          </label>
        )
      }

      {
        // Checking if error object exists and message property exist in it
        error?.message && (
          // If yes, then render an error message
          <p
            role="alert"
            aria-label={error?.message}
            className="text-sm font-Amulya font-bold text-red-500"
          >
            {error.message}
          </p>
        )
      }
    </div>
  );
};
