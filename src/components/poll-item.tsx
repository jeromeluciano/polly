import { Poll } from "@prisma/client";
import { FC } from "react";
import { HiUserGroup } from "react-icons/hi";
import { BsListOl } from "react-icons/bs";

const PollItem: FC = () => {
  return (
    <button className="bg-zinc-900 border border-zinc-800 rounded-md space-y-4 p-4 flex flex-col justify-center items-center">
      <h2 className="text-base font-bold text-center">
        Taylor Swift or Ariana Grande?
      </h2>
      <div className="flex space-x-4 mx-auto">
        <div className="flex items-center space-x-2">
          <BsListOl className="w-4 h-4 text-zinc-300" />
          <span className="text-sm">4</span>
        </div>
        <div className="flex items-center space-x-2">
          <HiUserGroup className="w-4 h-4 text-zinc-300" />
          <span className="text-sm">0</span>
        </div>
      </div>
    </button>
  );
};

export default PollItem;
