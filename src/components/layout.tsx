import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <div className="container mx-auto max-w-5xl">
      <Navbar />
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
