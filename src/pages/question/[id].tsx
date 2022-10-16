import { Option } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import OptionButton from "../../components/option-button";
import PrimaryButton from "../../components/primary-button";
import PuffLoading from "../../components/puff-loading";
import { trpc } from "../../utils/trpc";

const PollVotingPage: NextPage = () => {
  const { query } = useRouter();

  const { data: poll, isLoading: pollLoading } = trpc.poll.get.useQuery(
    {
      pollId: query.id as string,
    },
    {
      enabled: query.id != undefined,
    }
  );

  const { data: alreadyVoted, isLoading: alreadyVotedLoading } =
    trpc.poll.alreadyVoted.useQuery(
      {
        pollId: query.id as string,
      },
      {
        enabled: query.id != undefined,
      }
    );

  const utils = trpc.useContext();

  const mutation = trpc.poll.vote.useMutation({
    onSuccess: () => {
      setOptionSelected(null);
      // invalidate all options query
      utils.option.statistics.invalidate();
      utils.poll.alreadyVoted.invalidate();
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const [optionSelected, setOptionSelected] = useState<Option | null>(null);
  const [mouseOnSubmitButton, setMouseOnSubmitButton] = useState(false);

  function voteSubmit() {
    if (optionSelected) {
      mutation.mutateAsync({
        optionId: optionSelected?.id as string,
        pollId: optionSelected?.pollId as string,
      });
    }
  }

  function updateSelectedOption(option: Option | null) {
    if (!alreadyVoted) {
      setOptionSelected(option);
    }
  }

  if (alreadyVotedLoading || pollLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-14rem)]">
        <PuffLoading />
      </div>
    );
  }

  return (
    <div className="flex justify-center h-[calc(100vh-10rem)] items-center flex-grow">
      <div className="mx-auto ">
        <h1 className="font-bold text-2xl md:text-4xl lg:text-4xl mb-8">
          {poll?.question}
        </h1>
        <div className="px-8 max-w-lg mx-auto flex flex-col space-y-4">
          {poll?.options.map((option, index) => {
            return (
              <OptionButton
                option={option}
                key={option.id}
                index={index}
                optionSelectFn={updateSelectedOption}
                mouseOnSubmitButton={mouseOnSubmitButton}
                selected={
                  optionSelected !== null && option.id == optionSelected.id
                }
                alreadyVoted={alreadyVoted}
              />
            );
          })}
          {!alreadyVoted ? (
            <PrimaryButton
              title="Vote"
              loading={false}
              className="rounded-lg"
              disabled={!optionSelected ? true : false}
              onMouseEnter={() => setMouseOnSubmitButton(true)}
              onMouseLeave={() => setMouseOnSubmitButton(false)}
              onClick={voteSubmit}
            />
          ) : null}
        </div>
        <div className="w-full mx-auto text-center "></div>
      </div>
    </div>
  );
};

export default PollVotingPage;
