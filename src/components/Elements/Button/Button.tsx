type ButtonProps = {
    text?: string;
    className?: string;
    type?: "button" | "submit" | "reset" | undefined;
    handleClick?: any;
    children?: React.ReactNode
  };
 
  export  function Button({ text, className, handleClick, children, type }: ButtonProps) {
    return (
      <button onClick={handleClick} className={className} data-testid="button" type={type}>
        {text && text}  {children && children}
      </button>
    );
  }
  