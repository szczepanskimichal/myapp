import Link from "next/link";
import { useRouter } from "next/router";

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
      </header>
    </>
  );
}
