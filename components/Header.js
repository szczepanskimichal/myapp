import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CartContext } from "@/components/CartContext";

import { slideIn } from "@/utils/motion";
import UserIcon from "./icons/UserIcon";
import ShoppingCartIcon from "./icons/ShoppingCardIcon";
import Hamburger from "./icons/Hamburger";
import CloseIcon from "./icons/CloseIcon";

export default function Header({ categories }) {
  const inactiveLink =
    "hover:text-primary hover:scale-105 hover:decoration-primary decoration-secondary underline underline-offset-4 transition-all duration-300 delay-150";
  const activeLink = inactiveLink.replace(
    "decoration-secondary",
    "decoration-white"
  );

  const [isHovered, setIsHovered] = useState(false);

  const { cartProducts } = useContext(CartContext);

  const router = useRouter();
  const { pathname } = router;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full hidden sm:flex justify-around h-[80px] items-center bg-secondary text-white z-2">
        <Link href="/" className={inactiveLink}>
          Ecommerce
        </Link>
        <nav className="flex gap-10">
          <Link
            onMouseEnter={() => setIsHovered(false)}
            href={"/"}
            className={`${pathname === "/" ? activeLink : inactiveLink}`}
          >
            Home
          </Link>
          <Link
            onMouseEnter={() => setIsHovered(false)}
            href={"/products"}
            className={`${
              pathname.includes("/products") ? activeLink : inactiveLink
            }`}
          >
            All Products
          </Link>
          <div>
            <div
              onMouseEnter={() => setIsHovered(true)}
              className={`${inactiveLink} relative cursor-pointer`}
            >
              Categories
            </div>
          </div>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                onMouseLeave={() => setIsHovered(false)}
                variants={slideIn("down", "tween", 0.1, 0.3, true)}
                initial="hidden"
                whileInView="show"
                exit="exit"
                className="flex justify-center items-center absolute bg-secondary w-screen top-[80px] left-0 z-[-1] border-t border-white"
              >
                <div className="w-[70%] flex justify-center p-5 gap-y-5 gap-x-[150px] flex-wrap">
                  {categories?.map((category) => (
                    <Link
                      className={
                        pathname.includes("/categories/" + category._id)
                          ? activeLink
                          : inactiveLink
                      }
                      href={"/categories/" + category._id}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
              <div className="absolute top-2 left-4 bg-secondary text-white border-2 border-white rounded-full items-center justify-center flex size-5 text-xs transition delay-150 duration-300 group-hover:text-primary group-hover:border-primary">
                {cartProducts.length}
              </div>
            </div>
          </Link>
        </nav>
      </header>
      <header
        className={`w-full sm:hidden flex justify-around h-[70px] items-center transition duration-300 delay-150 text-white ${
          isMobileMenuOpen ? "bg-black" : "bg-secondary"
        }`}
      >
        <div
          onClick={() => setIsMobileMenuOpen(true)}
          className="cursor-pointer"
        >
          <Hamburger />
        </div>
        <Link href={"/"}>Ecommerce</Link>
        <Link href={"/cart"} className="group">
          <div className="flex items-center h-[60px] relative transition delay-150 duration-300 group-hover:text-primary">
            <ShoppingCartIcon />
            <div className="absolute top-2 left-4 bg-secondary text-white border-2 border-white rounded-full items-center justify-center flex size-5 text-xs transition delay-150 duration-300 group-hover:text-primary group-hover:border-primary">
              {cartProducts.length}
            </div>
          </div>
        </Link>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              variants={slideIn("left", "tween", 0, 0.5, false)}
              initial="hidden"
              whileInView="show"
              exit="exit"
              className="absolute top-0 left-0 h-screen bg-secondary w-[60%] pl-[60px]"
            >
              <div
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-5 right-5 cursor-pointer"
              >
                <CloseIcon />
              </div>
              <div className="flex flex-col justify-between h-[40%]">
                <nav className="flex flex-col gap-10 mt-[100px] justify-center">
                  <Link href={"/"} className={inactiveLink}>
                    Home
                  </Link>
                  <Link href={"/products"} className={inactiveLink}>
                    All Products
                  </Link>
                  <Link href={"/categories"} className={inactiveLink}>
                    Categories
                  </Link>
                </nav>
                <nav className="flex flex-col gap-10 justify-center">
                  <Link
                    href={"/account/profile"}
                    className="flex gap-3 items-center hover:text-primary"
                  >
                    Account
                    <UserIcon className="size-7" />
                  </Link>
                </nav>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
