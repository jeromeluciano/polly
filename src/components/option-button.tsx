import { Option } from "@prisma/client";
import { trpc } from "../utils/trpc";
import PuffLoading from "./puff-loading";

interface OptionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  option: Option;
  selected: boolean;
  index: number;
  alreadyVoted: boolean | undefined;
  mouseOnSubmitButton: boolean;
  optionSelectFn: (option: Option | null) => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  selected,
  index,
  optionSelectFn,
  mouseOnSubmitButton,
  alreadyVoted,
}) => {
  const { data: statistics, isLoading } = trpc.option.statistics.useQuery({
    optionId: option.id,
    pollId: option.pollId,
  });
  const colors = ["#d1d5db", "#6875f5", "#9061f9", "#f05252"];

  function getOptionVotePercentage(
    optionVoteCount: number,
    totalPollVoterCount: number
  ) {
    if (totalPollVoterCount == 0) {
      return 0;
    }
    return (optionVoteCount / totalPollVoterCount) * 100;
  }

  if (isLoading) {
    return (
      <>
        <button className="border bg border-gray-800  px-6 w-full mx-auto py-5 rounded-lg space-y-2 text-center">
          <PuffLoading />
        </button>
      </>
    );
  }

  return (
    <>
      {selected ? (
        <button
          className="border bg border-gray-800 bg-gray-800 px-6 w-full py-5 rounded-lg space-y-2"
          onClick={() => optionSelectFn(option)}
          onBlur={() => {
            if (!mouseOnSubmitButton) {
              optionSelectFn(null);
            }
          }}
        >
          <div className="flex justify-between">
            <div className="text-left text-md font-medium dark:text-white">
              {option.name}
            </div>
            <div>
              {getOptionVotePercentage(
                statistics?.optionVoteCount as number,
                statistics?.totalPollVoterCount as number
              )}
              % ({statistics?.optionVoteCount} /{" "}
              {statistics?.totalPollVoterCount})
            </div>
          </div>
          <div className="mb-4 h-4 bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className={`h-4 rounded-full`}
              style={{
                width: `${getOptionVotePercentage(
                  statistics?.optionVoteCount as number,
                  statistics?.totalPollVoterCount as number
                )}%`,
                backgroundColor: colors[index],
              }}
            ></div>
          </div>
        </button>
      ) : (
        <button
          className={`border border-gray-800 px-6 w-full py-5 rounded-lg space-y-2 ${
            alreadyVoted ? "cursor-default" : "cursor-pointer"
          }`}
          onClick={() => optionSelectFn(option)}
          onBlur={() => optionSelectFn(null)}
        >
          <div className="flex justify-between">
            <div className="text-left text-md font-medium dark:text-white">
              {option.name}
            </div>
            <div>
              {getOptionVotePercentage(
                statistics?.optionVoteCount as number,
                statistics?.totalPollVoterCount as number
              )}
              % ({statistics?.optionVoteCount} /{" "}
              {statistics?.totalPollVoterCount})
            </div>
          </div>
          <div className="mb-4 h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className={`h-4 rounded-full`}
                style={{
                  width: `${getOptionVotePercentage(
                    statistics?.optionVoteCount as number,
                    statistics?.totalPollVoterCount as number
                  )}%`,
                  backgroundColor: colors[index],
                }}
              ></div>
            </div>
          </div>
        </button>
      )}
    </>
  );
};

export default OptionButton;
