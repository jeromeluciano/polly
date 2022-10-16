import { Option } from "@prisma/client";

interface OptionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  option: Option;
  selected: boolean;
  index: number;
  optionSelectFn: (id: string) => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  option: { id, name },
  selected,
  index,
  optionSelectFn,
}) => {
  const colors = ["#d1d5db", "#6875f5", "#9061f9", "#f05252"];

  console.log(index);
  return (
    <>
      {selected ? (
        <button
          className="border bg border-gray-800 bg-gray-800 px-6 w-full py-5 rounded-lg space-y-2"
          onClick={() => optionSelectFn(id)}
          onBlur={() => optionSelectFn("")}
        >
          <div className="text-left text-lg font-medium dark:text-white">
            {name}
          </div>
          <div className="mb-4 h-4 bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className={`h-4 rounded-full`}
              style={{ width: "45%", backgroundColor: colors[index] }}
            ></div>
          </div>
        </button>
      ) : (
        <button
          className="border border-gray-800 px-6 w-full py-5 rounded-lg space-y-2"
          onClick={() => optionSelectFn(id)}
          onBlur={() => optionSelectFn("")}
        >
          <div className="text-left text-lg font-medium dark:text-white">
            {name}
          </div>
          <div className="mb-4 h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className={`h-4 rounded-full`}
                style={{ width: "45%", backgroundColor: colors[index] }}
              ></div>
            </div>
          </div>
        </button>
      )}
    </>
  );
};

export default OptionButton;
