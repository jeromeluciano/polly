import Image from "next/image";
import { useState } from "react";
import { TbLogout } from "react-icons/tb";
import { BsPersonFill } from "react-icons/bs";
import { signOut } from "next-auth/react";

const ProfileDropdown = () => {
  const [isOpen, toggle] = useState(false);
  return (
    <div className="relative space-y-5">
      <button
        className="flex items-center space-x-4 hover:text-gray-200 hover:opacity-80 active:opacity-100"
        onClick={() => toggle(!isOpen)}
        onBlur={() => toggle(false)}
      >
        <Image
          alt="Profile Image"
          src="https://via.placeholder.com/40.png"
          width="38"
          height="38"
          className="rounded-lg"
        />

        <h2 className="text-sm font-bold">John Jerome D. Luciano</h2>
      </button>
      {isOpen ? (
        <div
          className={
            "absolute bg-gray-900 border border-gray-700 border-radius w-full rounded-lg py-6 px-6 text-left text-xs text-gray-300 space-y-5"
          }
        >
          <div className="flex items-center space-x-3">
            <BsPersonFill className="w-4 h-4" />
            <p>ljohnjerome@gmail.com</p>
          </div>
          <div className="flex items-center space-x-2">
            <TbLogout className="w-5 h-5" />
            <button onClick={() => signOut()}>Logout</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileDropdown;
