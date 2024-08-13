import Link from "next/link";
import { FaGithub, FaLinkedin, FaWhatsapp, FaTwitter } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/TundeOladejo" },
  { icon: <FaLinkedin />, path: "https://www.linkedin.com/in/babatunde-oladejo/" },
  { icon: <FaWhatsapp />, path: "https://wa.me/qr/UPVSUMUEV3TWC1" },
  { icon: <FaTwitter />, path: "https://x.com/heisbabz?t=aHP5sJNmy0Khbg9Ovd4zxQ&s=09" },
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link
            key={index}
            href={item.path}
            className={iconStyles}
            target="_blank"
          >
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
