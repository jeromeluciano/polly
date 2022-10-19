import { Option } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/layout";
import OptionButton from "../../components/option-button";
import PrimaryButton from "../../components/primary-button";
import PuffLoading from "../../components/puff-loading";
import { trpc } from "../../utils/trpc";

const PollVotingPage: NextPage = () => {
  const [optionSelected, setOptionSelected] = useState<Option | null>(null);
  const [mouseOnSubmitButton, setMouseOnSubmitButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const { status } = useSession();
  const { query } = useRouter();
  const utils = trpc.useContext();

  const { data: poll, isLoading: pollLoading } = trpc.poll.get.useQuery(
    {
      pollId: query.id as string,
    },
    {
      enabled: !!query.id,
    }
  );

  const { data: alreadyVoted, isLoading: alreadyVotedLoading } =
    trpc.poll.alreadyVoted.useQuery(
      {
        pollId: query.id as string,
      },
      {
        enabled: !!query.id && status == "authenticated",
      }
    );

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

  async function voteSubmit() {
    if (optionSelected) {
      setLoading(true);
      await mutation.mutateAsync({
        optionId: optionSelected?.id as string,
        pollId: optionSelected?.pollId as string,
      });
      setLoading(false);
    }
  }

  function updateSelectedOption(option: Option | null) {
    if (!alreadyVoted) {
      setOptionSelected(option);
    }
  }

  if (status == "loading") {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[calc(100vh-14rem)]">
          <PuffLoading />
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>Polly - {poll?.question}</title>
      </Head>
      <Layout>
        <div className="flex justify-center h-[calc(100vh-10rem)] items-center flex-grow">
          <div className="mx-auto  w-full px-8 md:max-w-4xl">
            <h1 className=" text-center font-bold text-2xl md:text-4xl lg:text-4xl mb-4">
              {poll?.question}
            </h1>
            <div className="md:max-w-md w-full mx-auto flex flex-col space-y-4">
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
              {!alreadyVoted && status == "authenticated" ? (
                <PrimaryButton
                  title="Vote"
                  loading={loading}
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
      </Layout>
    </>
  );
};

export default PollVotingPage;
