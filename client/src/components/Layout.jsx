import Navbar from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="mt-8">{children}</div>
    </div>
  );
};
