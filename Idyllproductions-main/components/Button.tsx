
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  slideEffect?: boolean;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', slideEffect = false, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 transition-all duration-300 font-bold tracking-tight px-8 py-3 rounded-full text-sm";
  
  const variants = {
    primary: slideEffect 
      ? "relative overflow-hidden bg-[#0070F3] text-white shadow-xl group" 
      : "bg-[#0070F3] text-white hover:bg-[#001B3D] hover:shadow-xl active:scale-95",
    secondary: slideEffect
      ? "relative overflow-hidden bg-[#001B3D] text-white shadow-xl group"
      : "bg-[#001B3D] text-white hover:bg-[#0070F3] hover:shadow-xl active:scale-95",
    outline: slideEffect
      ? "relative overflow-hidden bg-white border border-gray-100 text-[#001B3D] shadow-lg group"
      : "bg-white border border-gray-100 text-[#001B3D] hover:border-[#0070F3] hover:text-[#0070F3] hover:shadow-lg active:scale-95 shadow-sm"
  };

  const slideContent = slideEffect ? (
    <>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        {children}
      </span>
      <div className={`absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out ${
        variant === 'primary' ? 'bg-[#001B3D]' : 
        variant === 'secondary' ? 'bg-[#0070F3]' : 
        'bg-[#0070F3]'
      }`}></div>
    </>
  ) : children;

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {slideContent}
    </button>
  );
};

export default Button;
