import React from 'react';
import classNames from 'classnames';

export function Button({ children, onClick, variant = 'primary', ...props }) {
  const buttonClass = classNames(
    'px-4 py-2 rounded',
    {
      'bg-blue-500 text-white': variant === 'primary',
      'bg-gray-500 text-white': variant === 'secondary',
    },
    props.className
  );

  return (
    <button className={buttonClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
