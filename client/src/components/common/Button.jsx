export const Button = ({ children, onClick, variant, size, disabled }) => {
  const variants = {
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 ${sizes[size]} ${
        variants[variant]
      } rounded ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
