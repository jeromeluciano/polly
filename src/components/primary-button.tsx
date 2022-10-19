import { FC } from "react";
import LoaderIcon from "./loader-icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  loading: boolean;
  // disabled: boolean;
}

const PrimaryButton: FC<ButtonProps> = ({ title, loading, ...pageProps }) => {
  const { className, disabled, ...rest } = pageProps;

  if (disabled) {
    return (
      <button
        {...rest}
        disabled={loading || disabled}
        className={
          "bg-pink-400 py-2.5 w-full rounded-lg shadow-md font-bold text-center " +
          className
        }
      >
        {!loading ? title : <LoaderIcon />}
      </button>
    );
  }

  return (
    <button
      {...rest}
      disabled={loading || disabled}
      className={
        "bg-pink-600 hover:bg-pink-700 active:bg-pink-800 py-2.5 w-full rounded-lg shadow-md font-bold text-center " +
        className
      }
    >
      {!loading ? title : <LoaderIcon />}
    </button>
  );
};

export default PrimaryButton;
