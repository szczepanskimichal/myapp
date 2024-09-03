import { useContext } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import { CartContext } from "@/components/CartContext";
import AddToCartIcon from "./icons/AddToCartIcon";
import ArrowIcon from "./icons/ArrowIcon";
import handle from "@/pages/api/products";

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);

  function handleAddToCart() {
    addProduct(product._id);
    const button = document.querySelector(".btn-outline");
    button.classList.add("animate");
    setTimeout(() => {
      button.classList.remove("animate");
    }, 1000);
  }
  return (
    <div className="p-10 bg-black text-white flex-grow flex items-center justify-center">
      <div className="flex flex-col md:grid grid-cols-2 lg:grid-cols-3 gap-[40px] mt-[80px]">
        <motion.div
          variants={fadeIn("right", "spring", 0.3, 1)}
          initial="hidden"
          whileInView="show"
          className="flex flex-col justify-between gap-10 items-center h-[75%]"
        >
          <div>
            <h1>{product.title}</h1>
            <p className="text-justify">{product.description}</p>
            <div className="py-5 flex gap-5">
              <Link href={"/products/" + product._id}>
                <button className="btn-secondary">Read More</button>
              </Link>
              <button className="btn-primary" onClick={() => handleAddToCart()}>
                <AddToCartIcon />
                Add to Cart
              </button>
            </div>
          </div>
          <a href={"/products/"}>
            <button className="bg-secondary p-3 rounded-full hover:scale-105 hover:bg-white hover:text-secondary duration-500">
              <ArrowIcon />
            </button>
          </a>
        </motion.div>
        <motion.div
          variants={fadeIn("right", "spring", 0.5, 1)}
          initial="hidden"
          whileInView="show"
          className="lg:col-span-2"
        >
          <img src={product.images[0]} alt={product.title} />
        </motion.div>
      </div>
    </div>
  );
}
