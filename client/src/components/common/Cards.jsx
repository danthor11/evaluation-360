export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-md ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => (
  <div className="p-4 border-b">{children}</div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-lg font-bold">{children}</h2>
);

export const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-600">{children}</p>
);

export const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);
