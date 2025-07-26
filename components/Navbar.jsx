import Image from "next/image";

export default function Navbar() {
  return (
    <nav>
      <div className="container flex justify-between items-center py-4">
        <div className="nav-brand">
          <a href="index.html">
            <Image
              src="/assets/logo.svg"
              alt="Eventry"
              className="h-[45px]"
              width={100}
              height={60}
            />
          </a>
        </div>
        <ul className="flex gap-4 text-[#9C9C9C]">
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </nav>
  );
}
