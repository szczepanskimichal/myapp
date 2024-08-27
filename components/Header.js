import Link from "next/link";
import { useRouter } from "next/router";
import UserIcon from "./icons/UserIcon";
import ShoppingCartIcon from "./icons/ShoppingCardIcon";

export default function Header() {
  const inactiveLink =
    "hover:text-primary hover:scale-105 hover:decoration-primary decoration-secondary underline underline-offset-4 transition-all duration-300 delay-150";
  const activeLink = inactiveLink.replace(
    "decoration-secondary",
    "decoration-white"
  );

  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      <header className="fixed top-0 w-full hidden sm:flex justify-around h-[80px] items-center bg-secondary text-white z-2">
        <Link href="/" className={inactiveLink}>
          Ecommerce
        </Link>
        <nav className="flex gap-10">
          <Link
            href={"/"}
            className={`${pathname === "/" ? activeLink : inactiveLink}`}
          >
            Home
          </Link>
          <Link
            href={"/products"}
            className={`${
              pathname.includes("/products") ? activeLink : inactiveLink
            }`}
          >
            All Products
          </Link>
          <div>
            <div>Categories</div>
          </div>
        </nav>
        <nav className="flex gap-10 items-center">
          <Link
            href={"/account/profile"}
            className="transition delay-150 duration-300 hover:text-primary"
          >
            <UserIcon className="size-7" />
          </Link>
          <Link href={"/cart"} className="group">
            <div className="flex items-center h-[60px] relative transition delay-150 duration-300 group-hover:text-primary">
              <ShoppingCartIcon />
              <div className="absolute top-2 left-4 bg-secondary text-white border-2 border-white rounded-full items-center justify-center flex size-5 text-xs transition delay-150 duration-300 group-hover_text-primary group-hover:border-primary">
                0
              </div>
            </div>
          </Link>
        </nav>
      </header>
      <header></header>
    </>
  );
}
