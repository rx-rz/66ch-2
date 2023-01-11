import {
  FieldValues,
  SubmitHandler,
  UseControllerProps,
  useForm,
  UseFormProps,
  UseFormReset,
  UseFormReturn,
} from "react-hook-form";

type FormProps<TFormValues extends FieldValues> = {
  // optional className prop for styling
  className?: string;
  // onSubmit callback function that takes in the form values
  onSubmit: SubmitHandler<TFormValues>;
  // optional reset function for resetting the form
  reset?: UseFormReset<TFormValues>;
  // function that receives the form methods as argument and returns a ReactNode
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  // optional options prop to configure the form behavior
  options?: UseFormProps<TFormValues> | UseControllerProps<TFormValues>;
};

export const Form = <TFormValues extends Record<string, any>>({
  onSubmit,
  children,
  options,
  className,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({ ...options });
  return (
    <div>
      <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children(methods)}
      </form>
    </div>
  );
};
