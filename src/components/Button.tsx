import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick, ...rest }: ButtonProps) {
  return (
    <button onClick={onClick} {...rest}>
      {label}
    </button>
  );
}

export default Button;
