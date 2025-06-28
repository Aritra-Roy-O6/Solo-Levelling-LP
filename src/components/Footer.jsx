import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

const Footer = () => {
  return (
    <footer id="footer"className="w-screen bg-gaming-primary py-4 text-white">
      <div className="w-full flex flex-col items-center justify-center mb-4">
      <span className="royz-gaming-warp text-neon-blue text-10xl md:text-17xl font-black font-zentry transition-transform duration-500 cursor-pointer w-full text-center">          
        <b>SOLO LEVELLING</b>
        </span>
      </div>
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left text-gray-300">
          ©RoyZGameZ 2025. All rights reserved
        </p>

        <div className="flex justify-center gap-4  md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 transition-colors duration-500 ease-in-out hover:text-neon-blue"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-center text-sm font-light hover:underline md:text-right text-gray-300 hover:text-neon-blue"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
