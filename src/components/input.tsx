import { FC, InputHTMLAttributes } from "react";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...pageProps }) => {
  const { className, ...rest } = pageProps;
  return (
    <input
      {...rest}
      type="text"
      className={
        "py-2 border border-zinc-800 bg-zinc-900 text-white rounded-lg text-base px-2 " +
        className
      }
    />
  );
};

export default Input;
