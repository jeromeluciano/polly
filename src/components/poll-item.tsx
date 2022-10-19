import { Poll } from "@prisma/client";
import { FC } from "react";
import { HiUserGroup } from "react-icons/hi";
import { BsListOl } from "react-icons/bs";
import Link from "next/link";

interface PollItemProps {
  poll: Poll & {
    _count: {
      options: number;
      votes: number;
    };
  };
}

const PollItem: FC<PollItemProps> = ({ poll }) => {
  return (
    <Link href={`/question/${poll.id}`}>
      <button className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-700 active:bg-zinc-800 hover:text-gray-300 active:text-gray-200 rounded-md space-y-4 p-4 flex flex-col justify-center items-center">
        <h2 className="text-base font-bold text-center">{poll.question}</h2>
        <div className="flex space-x-4 mx-auto">
          <div
            className="flex items-center space-x-2"
            aria-label="Number of count"
          >
            <BsListOl
              className="w-4 h-4 text-zinc-300"
              name="number of options"
            />
            <span className="text-sm">{poll._count.options}</span>
          </div>
          <div className="flex items-center space-x-2">
            <HiUserGroup
              className="w-4 h-4 text-zinc-300"
              name="Number of voters"
            />
            <span className="text-sm">{poll._count.votes}</span>
          </div>
        </div>
      </button>
    </Link>
  );
};

export default PollItem;
