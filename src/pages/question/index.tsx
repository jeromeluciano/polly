/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Poll } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { FormEvent, useCallback, useState } from "react";
import { uuid } from "uuidv4";
import Input from "../../components/input";
import Layout from "../../components/layout";
import OptionInput from "../../components/option-input";
import PrimaryButton from "../../components/primary-button";
import { trpc } from "../../utils/trpc";

const QuestionPage: NextPage = () => {
  const mutation = trpc.poll.create.useMutation({
    onSuccess: (data) => {
      setQuestion("");
      setOptions(initialOptionState);
      setLink({ poll: data?.poll, url: data?.url });
    },
  });

  const [question, setQuestion] = useState("");
  const [questionError, setQuestionError] = useState(false);
  // const [errors, setErrors] = useState(0);
  const initialOptionState = [
    { id: uuid(), name: "", error: false },
    { id: uuid(), name: "", error: false },
  ];
  const [options, setOptions] = useState(initialOptionState);
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState<{ poll: Poll; url: string } | undefined>(
    undefined
  );

  function add() {
    setOptions([...options, { id: uuid(), name: "", error: false }]);
  }

  function remove(option: { id: string; name: string }) {
    setOptions((current) =>
      current.filter((_option) => option.id !== _option.id)
    );
  }

  const validateOptions = useCallback(() => {
    const validated = options.map((option) => {
      if (option.name.length == 0) {
        return {
          ...option,
          error: true,
        };
      }
      return { ...option, error: false };
    });
    setOptions(validated);

    return validated;
  }, [options]);

  const validateQuestion = useCallback((question: string) => {
    if (question.length == 0) {
      setQuestionError(true);
      return "failed";
    }
    setQuestionError(false);
    return "success";
  }, []);

  const submit = useCallback(
    async function submit(e: FormEvent<HTMLButtonElement>) {
      e.preventDefault();
      setLoading(true);
      let errors = 0;
      // validate first before submit
      // all added input must be required

      const validatedOption = validateOptions();
      const validatedQuestion = validateQuestion(question);

      validatedOption.forEach((option) => {
        if (option.error) {
          errors += 1;
        }
      });

      if (errors == 0 && validatedQuestion == "success") {
        await mutation.mutateAsync({
          question: question,
          options: options.map((option) => option.name),
        });
      }
      setLoading(false);
    },
    [mutation, options, question, validateOptions, validateQuestion]
  );

  return (
    <>
      <Head>
        <title>Polly - Create a poll</title>
      </Head>
      <Layout>
        <div className="flex flex-1 items-center justify-center h-[42rem]">
          <div className="text-center max-w-xs w-full">
            <h2 className="font-bold text-3xl mb-4">Create a poll?</h2>
            <form className="flex flex-col gap-y-4 ">
              <Input
                className={`px-4 py-2.5 ${
                  questionError ? "border-red-600" : "border-zinc-800"
                }`}
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              {options.map((option, index) => (
                <OptionInput
                  add={add}
                  remove={remove}
                  length={options.length}
                  index={index + 1}
                  key={option.id}
                  option={option}
                  onChange={(e) =>
                    setOptions((current) =>
                      current.map((_option) => {
                        if (option.id == _option.id) {
                          return {
                            ..._option,
                            name: e.target.value,
                          };
                        }
                        return _option;
                      })
                    )
                  }
                />
              ))}
              <PrimaryButton
                loading={loading}
                title="SUBMIT"
                onClick={submit}
              />
            </form>

            {link ? (
              <Link href={`/question/${link.poll.id}`}>
                <div className="mt-4 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-3.5 rounded-lg text-xs overflow-hidden cursor-pointer">
                  {link.url}
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      </Layout>
    </>
  );
};
// @ts-ignore
QuestionPage.auth = true;
export default QuestionPage;
