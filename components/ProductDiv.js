import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";
import { useContext } from "react";
import { CartContext } from "./CartContext";

import Link from "next/link";
import ShoppingCartIcon from "./icons/ShoppingCardIcon";

export default function ProductDiv({ _id, title, images, price, index }) {
  const { addProduct } = useContext(CartContext);

  function handleAddToCart() {
    addProduct(_id);
    const button = document.getElementById(index).querySelector(".btn-outline");
    button.classList.add("animate");
    setTimeout(() => {
      button.classList.remove("animate");
    }, 1000);
  }

  return (
    <motion.div
      variants={fadeIn("down", "spring", 0.1 * index, 1)}
      initial="hidden"
      whileInView="show"
      className="box"
      id={index}
    >
      <div className="bg-white h-[200px] p-3 mb-2 rounded-lg flex justify-center items-center">
        <Link href={"/products/" + _id}>
          <img className="max-h-[150px]" src={images[0]} alt="" />
        </Link>
      </div>

      <div className="p-3">
        <Link href={"/products/" + _id}>
          <h3 className="text-lg hover:text-primary hover:decoration-primary decoration-gray-100 underline transition-all delay-150 duration-300">
            {title}
          </h3>
        </Link>

        <div className="flex gap-3 justify-between items-center mt-3">
          <p className="text-2xl font-bold">${price}</p>

          <button className="btn-outline" onClick={() => handleAddToCart()}>
            <ShoppingCartIcon className="size-7" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
