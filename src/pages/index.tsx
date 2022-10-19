import { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout";
import PollItem from "../components/poll-item";
import { BsPlusLg } from "react-icons/bs";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import PuffLoading from "../components/puff-loading";

const MyPollPage: NextPage = () => {
  const { data: polls, isLoading } = trpc.poll.getMyPolls.useQuery();

  return (
    <>
      <Head>
        <title>Polly - Your polls</title>
      </Head>
      <Layout>
        <div className="px-8">
          <div className="mb-5">
            <h1 className="font-bold">My Polls</h1>
          </div>
          <ul className="grid grid-cols-1  auto-rows-[180px] md:auto-rows-[150px] md:grid-cols-3 gap-5 mb-8">
            {polls?.map((poll) => (
              <PollItem key={poll.id} poll={poll} />
            ))}
            <LinkAddButton />
          </ul>
        </div>
      </Layout>
    </>
  );
};

const LinkAddButton = () => {
  return (
    <Link href="/question">
      <button
        aria-label="Poll Item Button"
        className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-700 active:bg-zinc-800 hover:text-gray-300 active:text-gray-200 rounded-md space-y-4 p-4 flex flex-col justify-center items-center"
      >
        <BsPlusLg className="w-7 h-7 text-gray-200" />
      </button>
    </Link>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
MyPollPage.auth = true;

export default MyPollPage;
