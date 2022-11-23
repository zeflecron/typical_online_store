import Link from "next/link";
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";

export default function Footer() {
  const socials = [
    {
      name: "Facebook",
      logo: <BsFacebook className="text-2xl pr-2" />,
      link: "https://www.facebook.com/",
    },
    {
      name: "Twitter",
      logo: <BsTwitter className="text-2xl pr-2" />,
      link: "https://www.twitter.com/",
    },
    {
      name: "Linkedin",
      logo: <BsLinkedin className="text-2xl pr-2" />,
      link: "https://www.linkedin.com/",
    },
    {
      name: "Instagram",
      logo: <BsInstagram className="text-2xl pr-2" />,
      link: "https://www.instagram.com/",
    },
  ];

  return (
    <footer className="bg-green-600">
      <div className="flex flex-row">
        <div className="flex flex-col text-white items-center w-1/2 text-md font-latoBold p-2">
          <p className="text-lg">Socials:</p>
          <ul>
            {socials.map((s) => (
              <li key={s.name}>
                <Link href={s.link} className="flex hover:text-black m-4">
                  {s.logo}
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col text-white items-center w-1/2 text-md font-latoBold p-2">
          <p className="text-lg">SOMETHING</p>
          <ul>
            <li className="flex hover:text-black m-4">Just</li>
            <li className="flex hover:text-black m-4">Another</li>
            <li className="flex hover:text-black m-4">List</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-white pb-4 text-md">
        ⓒ 2022 Typical Online Store
      </div>
    </footer>
  );
}
