import { useSession } from "next-auth/react";
import IconButton from "./icon-button";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { useState } from "react";

const MobileNavigation = () => {
  const { data: session, status } = useSession();
  const [isOpen, toggle] = useState(false);
  const [mouseOnDropdown, setMouseOnDropdown] = useState(false);
  return (
    <>
      {session && status == "authenticated" ? (
        <div className="relative space-y-4">
          <IconButton
            className="block md:hidden lg:hidden"
            icon={<GiHamburgerMenu className="w-6 h-6" />}
            onClick={() => toggle(!isOpen)}
            onBlur={() => toggle(false)}
          />

          {isOpen || mouseOnDropdown ? (
            <div
              onMouseEnter={() => setMouseOnDropdown(true)}
              onMouseLeave={() => {
                toggle(false);
                setMouseOnDropdown(false);
              }}
              className="absolute right-0 flex flex-col bg-zinc-900 border border-zinc-800 text-left  w-[15rem] rounded-lg"
            >
              <Link href="/">
                <a className="text-gray-200 text-sm py-4 px-6 hover:bg-zinc-800">
                  My polls
                </a>
              </Link>
              <Link href="/question">
                <a className="text-gray-200 text-sm py-4 px-6 hover:bg-zinc-800">
                  Question
                </a>
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default MobileNavigation;
