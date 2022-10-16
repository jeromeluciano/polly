import { NextPage } from "next";
import { FormEvent, MouseEventHandler, useState } from "react";
import { uuid } from "uuidv4";
import Input from "../../components/input";
import OptionInput from "../../components/option-input";
import PrimaryButton from "../../components/primary-button";
import { trpc } from "../../utils/trpc";

const QuestionPage: NextPage = () => {
  const mutation = trpc.poll.create.useMutation({
    onSuccess: (data) => {
      setQuestion("");
      setOptions(initialOptionState);
      setLink(data?.url);
    },
  });

  const [question, setQuestion] = useState("");
  const initialOptionState = [
    { id: uuid(), name: "" },
    { id: uuid(), name: "" },
  ];
  const [options, setOptions] = useState(initialOptionState);
  const [loading, setLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const [link, setLink] = useState<string | undefined>("");

  function add() {
    setOptions([...options, { id: uuid(), name: "" }]);
  }

  function remove(option: { id: string; name: string }) {
    setOptions((current) =>
      current.filter((_option) => option.id !== _option.id)
    );
  }

  async function copyClipboard() {
    if (window && window !== undefined) {
      if (link) {
        await navigator.clipboard.writeText(link);
        setCopyStatus(true);
        setTimeout(() => {
          setCopyStatus(false);
        }, 3000);
      }
    }
  }

  async function submit(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
    await mutation.mutateAsync({
      question: question,
      options: options.map((option) => option.name),
    });
    setLoading(false);
  }

  return (
    <div className="flex flex-1 items-center justify-center h-[42rem]">
      <div className="text-center max-w-xs w-full">
        <h2 className="font-bold text-3xl mb-4">Create a poll?</h2>
        <form className="flex flex-col gap-y-4 ">
          <Input
            className="px-4 py-2.5"
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
          <PrimaryButton loading={loading} title="SUBMIT" onClick={submit} />
        </form>

        {link ? (
          <div
            className="mt-4 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-3.5 rounded-lg text-xs overflow-hidden cursor-pointer"
            onClick={copyClipboard}
          >
            {copyStatus ? "Copied!" : link}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default QuestionPage;
