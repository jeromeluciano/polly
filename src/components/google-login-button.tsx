import { FC } from "react";
import { BsGoogle } from "react-icons/bs";

const GoogleLoginButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-3/6 md:w-1/5 space-x-2 bg-pink-600 text-white py-2.5  mx-auto rounded-lg font-bold hover:bg-pink-700 hover:text-gray-200 active:bg-pink-800 active:text-gray-100 text-sm tracking-wide"
    >
      <BsGoogle className="w-6 h-6" />
      <div>Signin with Google</div>
    </button>
  );
};

export default GoogleLoginButton;
