import Image from "next/image";
import { useState } from "react";
import { TbLogout } from "react-icons/tb";
import { BsPersonFill } from "react-icons/bs";
import { signOut, useSession } from "next-auth/react";
import ThreeDotsLoader from "./three-dots-loader";
import { MdAlternateEmail } from "react-icons/md";

const ProfileDropdown = () => {
  const [isOpen, toggle] = useState(false);
  const [mouseOnDropdown, setMouseOnDropdown] = useState(false);
  const { data: session, status } = useSession();

  if (status == "loading") {
    return (
      <div>
        <ThreeDotsLoader />
      </div>
    );
  }

  return (
    <div className="relative space-y-5">
      <button
        className="flex items-center space-x-4 hover:text-gray-200 hover:opacity-80 active:opacity-100 "
        onClick={() => toggle(!isOpen)}
        onBlur={() => toggle(false)}
      >
        {session ? (
          <Image
            alt="Profile Image"
            src={session?.user?.image as string}
            width="38"
            height="38"
            className="rounded-lg border"
          />
        ) : null}
      </button>
      {isOpen || mouseOnDropdown ? (
        <div
          className={
            "absolute right-0 md:right-0 xl:left-0 bg-zinc-900 border border-zinc-700 border-radius w-full min-w-fit rounded-lg py-6 px-6 text-left text-xs text-gray-300 space-y-5"
          }
          onMouseEnter={() => setMouseOnDropdown(true)}
          onMouseLeave={() => {
            toggle(false);
            setMouseOnDropdown(false);
          }}
        >
          <div className="flex items-center space-x-3 ">
            <BsPersonFill className="w-4 h-4" />
            <p>{session?.user?.name}</p>
          </div>
          <div className="flex items-center space-x-3">
            <MdAlternateEmail className="w-4 h-4" />
            <p>ljohnjerome@gmail.com</p>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center space-x-2 w-full hover:text-gray-400"
          >
            <TbLogout className="w-5 h-5" />
            <div>Logout</div>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileDropdown;
