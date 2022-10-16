import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen mx-auto max-w-5xl">
      <Navbar />
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
