type ButtonProps = {
    text?: string;
    className?: string;
    handleClick: () => void;
    children?: React.ReactNode
  };
 
  export  function Button({ text, className, handleClick, children }: ButtonProps) {
    return (
      <button onClick={handleClick} className={className} data-testid="button">
        {text && text}  {children && children}
      </button>
    );
  }
  