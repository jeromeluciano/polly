import { FC, InputHTMLAttributes } from "react";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...pageProps }) => {
  const { className, ...rest } = pageProps;
  return (
    <input
      {...rest}
      type="text"
      className={
        "py-2 border border-gray-700 bg-gray-900 text-white rounded-lg px-2 " +
        className
      }
    />
  );
};

export default Input;
