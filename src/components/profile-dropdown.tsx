import Image from "next/image";
import { useState } from "react";
import { TbLogout } from "react-icons/tb";
import { BsPersonFill } from "react-icons/bs";
import { signOut, useSession } from "next-auth/react";

const ProfileDropdown = () => {
  const [isOpen, toggle] = useState(false);
  const [mouseOnDropdown, setMouseOnDropdown] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="relative space-y-5">
      <button
        className="flex items-center space-x-4 hover:text-gray-200 hover:opacity-80 active:opacity-100 "
        onClick={() => toggle(!isOpen)}
        onBlur={() => toggle(false)}
      >
        <Image
          alt="Profile Image"
          src={session?.user?.image ?? "https://via.placeholder.com/38"}
          width="38"
          height="38"
          className="rounded-lg border"
        />

        <h2 className="text-sm font-bold">{session?.user?.name}</h2>
      </button>
      {isOpen || mouseOnDropdown ? (
        <div
          className={
            "absolute right-0 md:right-0 xl:left-0 bg-gray-900 border border-gray-700 border-radius w-full min-w-fit rounded-lg py-6 px-6 text-left text-xs text-gray-300 space-y-5"
          }
          onMouseEnter={() => setMouseOnDropdown(true)}
          onMouseLeave={() => {
            toggle(false);
            setMouseOnDropdown(false);
          }}
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
