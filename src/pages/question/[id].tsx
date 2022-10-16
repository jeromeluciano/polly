import { Option } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import OptionButton from "../../components/option-button";
import PrimaryButton from "../../components/primary-button";
import { trpc } from "../../utils/trpc";

const PollVotingPage: NextPage = () => {
  const { query } = useRouter();
  const { data } = trpc.poll.get.useQuery({
    pollId: query.id as string,
  });
  const [optionSelected, setOptionSelected] = useState<string | null>(null);
  console.log(data?.options);
  return (
    <div className="flex justify-center h-[calc(100vh-10rem)] items-center flex-grow">
      <div className="mx-auto ">
        <h1 className="font-bold text-2xl md:text-4xl lg:text-4xl mb-6">
          {data?.question}
        </h1>
        <div className="px-4 flex flex-col space-y-4">
          {data?.options.map((option, index) => {
            return (
              <OptionButton
                option={option}
                key={option.id}
                index={index}
                optionSelectFn={setOptionSelected}
                selected={option.id == optionSelected}
              />
            );
          })}
          <PrimaryButton
            title="Vote"
            loading={false}
            className="rounded-lg"
            disabled={!optionSelected ? true : false}
          />
        </div>
        <div className="w-full mx-auto text-center "></div>
      </div>
    </div>
  );
};

export default PollVotingPage;
