import { CartContext } from "@/components/CartContext";
import Layout from "@/components/Layout";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import UserForm from "@/components/UserForm";

function checkMobile() {
  if (typeof window !== "undefined") {
    return window.innerWidth < 640 ? true : false;
  }
  return false;
}

export default function CartPage() {
  const { cartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  const [isMobile, setIsMobile] = useState(checkMobile());

  useEffect(() => {
    function handleResize() {
      setIsMobile(checkMobile());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  return (
    <Layout>
      <div className="flex justify-center p-5 sm:p-10">
        <div className="sm:min-w-[40rem] sm:w-[80%] flex flex-col sm:grid grid-cols-3 gap-10 items-start">
          <motion.div
            variants={fadeIn(isMobile ? "down" : "right", "spring", 0.1, 1)}
            initial="hidden"
            whileInView="show"
            className="box p-5 col-span-2 text-sm sm:text-normal"
          >
            {!cartProducts?.length && <h3>Your cart is empty</h3>}
            {products?.length > 0 && (
              <>
                <h3>Cart</h3>
                <Table products={products} cartProducts={cartProducts} />
              </>
            )}
          </motion.div>
          <motion.div
            variants={fadeIn(isMobile ? "down" : "left", "spring", 0.1, 1)}
            initial="hidden"
            whileInView="show"
            className="box p-5 sticky top-[120px]"
          >
            <h3>Order information</h3>
            <div>
              <UserForm cartProducts={cartProducts} />
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
