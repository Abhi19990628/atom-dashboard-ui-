export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${className}`}
      {...props}
    />
  );
}
