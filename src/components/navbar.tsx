import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useState } from "react";
import MobileNavigation from "./mobile-navigation";
import PrimaryButton from "./primary-button";
import ProfileDropdown from "./profile-dropdown";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex py-6 md:py-8 md:px-12 lg:px-8 px-8 items-center space-x-12">
      <h1 className="text-2xl text-blue-600 font-bold">POLLY</h1>
      <div className="flex flex-1 space-x-12 justify-between items-center">
        <div className="flex flex-1  space-x-6">
          <LinkItem link="/question" linkTitle="Questions" />
          <LinkItem link="/my-polls" linkTitle="My polls" />
        </div>
        <div className="flex space-x-4">
          <div>
            {!session && status == "unauthenticated" ? (
              <PrimaryButton
                title="Login"
                className="px-6 text-sm"
                loading={loading}
                onClick={() => {
                  setLoading(true);
                  signIn("google");
                  setLoading(false);
                }}
              />
            ) : (
              <ProfileDropdown />
            )}
          </div>
          <MobileNavigation />
        </div>
      </div>
    </div>
  );
};

const LinkItem: FC<{ link: string; linkTitle: string }> = ({
  link,
  linkTitle,
}) => {
  return (
    <Link href={link}>
      <a className="hidden md:block text-white font-bold ">{linkTitle}</a>
    </Link>
  );
};

export default Navbar;
