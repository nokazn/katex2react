import React, { FC } from 'react';

export interface IButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  text?: string;
}

export const Button: FC<IButtonProps> = ({ onClick, disabled, className, text }) => (
  <button type='button' className={className} onClick={onClick} disabled={disabled}>
    {text}
  </button>
);
