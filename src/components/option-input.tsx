import { ChangeEvent, FC } from "react";
import Input from "./input";
import PlusIcon from "./plus-icon";
import TrashIcon from "./trash-icon";

interface OptionInputProps {
  option: {
    id: string;
    name: string;
  };
  index: number;
  length: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  remove: (option: { id: string; name: string }) => void;
  add: () => void;
}

const OptionInput: FC<OptionInputProps> = ({
  add,
  option,
  index,
  length,
  remove,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-center">
      <Input
        className="w-full px-4"
        key={option.id}
        placeholder="Option"
        value={option.name}
        onChange={onChange}
      />
      {index == length ? (
        <button
          className="px-4"
          onClick={(e) => {
            e.preventDefault();
            add();
          }}
        >
          <PlusIcon />
        </button>
      ) : length > 2 ? (
        <button
          className="px-4"
          onClick={(e) => {
            e.preventDefault();
            remove(option);
          }}
        >
          <TrashIcon />
        </button>
      ) : null}
    </div>
  );
};

export default OptionInput;
