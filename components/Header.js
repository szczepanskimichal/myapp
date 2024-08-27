import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="fixed top-0 w-full hidden sm:flex justify-around h-[80px] items-center bg-secondary text-white z-2">
        <Link href="/">Ecommerce</Link>
        <nav className="flex gap-10">
          <Link href={"/"}>Home</Link>
          <Link href={"/products"}>All Products</Link>
          <div>
            <div>Categories</div>
          </div>
        </nav>
      </header>
    </>
  );
}
