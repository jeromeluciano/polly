import Link from "next/link";
import { ImFacebook2 } from "react-icons/im";
import { TfiGithub } from "react-icons/tfi";
import { GrLinkedin } from "react-icons/gr";

const Footer = () => {
  return (
    <footer className="mt-auto px-8 py-4 flex flex-col items-center justify-center space-x-4 space-y-2 text-gray-300">
      <div className="flex flex-row space-x-4">
        <a href="https://www.facebook.com/jjdluciano">
          <ImFacebook2 className="w-4 h-4" />
        </a>

        <a href="https://github.com/jeromeluciano/polly">
          <TfiGithub className="w-4 h-4" />
        </a>

        <a href=" https://www.linkedin.com/in/john-jerome-luciano-a65490233/">
          <GrLinkedin className="w-4 h-4" />
        </a>
      </div>
      <h2 className="text-xs font-mono">
        &copy; {new Date().getFullYear()} John Jerome D. Luciano
      </h2>
    </footer>
  );
};

export default Footer;
