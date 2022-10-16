import { ButtonHTMLAttributes, FC } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: any;
}

const IconButton: FC<IconButtonProps> = ({ icon, ...pageProps }) => {
  const { className, ...rest } = pageProps;
  return (
    <button className={"py-2 px-2 " + className} {...rest}>
      {icon}
    </button>
  );
};

export default IconButton;
