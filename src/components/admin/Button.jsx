import React from 'react';

const Button = ({ children, variant = 'primary', onClick, className = '', type = 'button' }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-kanit font-semibold transition-all duration-300 text-base";
  const variants = {
    primary: "bg-[#f2b724] text-[#072c4d] hover:bg-[#d9a420]",
    secondary: "bg-[#637996] text-white hover:bg-[#3b5474]"
  };
  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;