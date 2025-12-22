export function Checkbox({ id, className = '', ...props }) {
  return (
    <input
      type="checkbox"
      id={id}
      className={`w-4 h-4 rounded cursor-pointer accent-cyan-500 ${className}`}
      {...props}
    />
  );
}
