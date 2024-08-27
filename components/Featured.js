import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

import AddToCartIcon from "./icons/AddToCartIcon";
import ArrowIcon from "./icons/ArrowIcon";

export default function Featured() {
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
            <h1>Macbook Pro</h1>
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              et iusto temporibus repellat hic perspiciatis quae repellendus
              nobis sunt autem? Cumque ab atque inventore maiores nihil
              repellendus ad eaque minus?
            </p>
            <div className="py-5 flex gap-5">
              <Link href={"/products/"}>
                <button className="btn-secondary">Read More</button>
              </Link>
              <button className="btn-primary">
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
          <img
            src="https://i.ytimg.com/vi/8cZjdE1r8vI/maxresdefault.jpg"
            alt=""
          />
        </motion.div>
      </div>
    </div>
  );
}
