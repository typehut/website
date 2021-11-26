import Link from "next/link";

import type { NavbarItemProps } from "./Navbar.types";

const NavbarItem = ({ children, href }: NavbarItemProps) => {
  return (
    <Link href={href}>
      <a className="flex items-center h-full px-1">{children}</a>
    </Link>
  );
};

export default NavbarItem;
