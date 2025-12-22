export function Button({ children, className = '', size = 'md', ...props }) {
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  return (
    <button
      className={`rounded-lg font-semibold transition-all duration-300 ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
