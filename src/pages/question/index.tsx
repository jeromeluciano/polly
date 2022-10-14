import { NextPage } from "next";
import { useState } from "react";
import { uuid } from "uuidv4";
import Input from "../../components/input";
import OptionInput from "../../components/option-input";
import PrimaryButton from "../../components/primary-button";

const QuestionPage: NextPage = () => {
  const [question, setQuestion] = useState("");
  const initialOptionState = [
    { id: uuid(), name: "" },
    { id: uuid(), name: "" },
  ];
  const [options, setOptions] = useState(initialOptionState);
  const [loading, setLoading] = useState(false);
  function add() {
    setOptions([...options, { id: uuid(), name: "" }]);
  }

  function remove(option: { id: string; name: string }) {
    setOptions((current) =>
      current.filter((_option) => option.id !== _option.id)
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center h-[42rem]">
      <div className=" text-center ">
        <h2 className="font-bold text-3xl mb-4">Create a poll?</h2>
        <form className="flex flex-col gap-y-4">
          <Input
            className="px-4"
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
            onClick={(e) => {
              setLoading(true);
              e.preventDefault();
              setTimeout(() => {
                setLoading(false);
              }, 2500);
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default QuestionPage;
