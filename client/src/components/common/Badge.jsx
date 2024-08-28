export const Badge = ({ children, variant }) => {
  const variants = {
    default: "bg-gray-200 text-gray-800",
    secondary: "bg-blue-200 text-blue-800",
    outline: "border border-gray-300 text-gray-800",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${variants[variant]}`}>
      {children}
    </span>
  );
};
