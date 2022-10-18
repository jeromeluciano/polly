import { NextPage } from "next";
import Layout from "../components/layout";

const MyPollPage: NextPage = () => {
  return (
    <Layout>
      <div>
        <h1>My Polls</h1>
      </div>
    </Layout>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
MyPollPage.auth = true;

export default MyPollPage;
