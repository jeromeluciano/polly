import { FC } from "react";
import Navbar from "./navbar";

const IndexLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <div className="flex flex-col mx-auto max-w-5xl">
        <Navbar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default IndexLayout;
