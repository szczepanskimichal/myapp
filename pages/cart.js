import Link from "next/link";
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
    return window.innerWidth < 640;
  }
  return false;
}

export default function CartPage() {
  const { cartProducts, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false); // Moved this state to properly manage success status
  const [isMobile, setIsMobile] = useState(checkMobile());

  // Handle mobile check on resize
  useEffect(() => {
    function handleResize() {
      setIsMobile(checkMobile());
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fetch products in the cart
  useEffect(() => {
    if (cartProducts?.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
  }, [cartProducts]);

  // Check for success URL and clear the cart
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, [clearCart]);

  if (isSuccess) {
    return (
      <Layout>
        <div className="p-10 flex flex-col justify-center items-center sm:mt-[80px]">
          <h2 className="text-center">Your payment was successful!</h2>
          <p>Please check your email for details.</p>
          <Link href="/" className="mt-5">
            <button onClick={clearCart} className="btn-outline">
              Go back to shopping
            </button>
          </Link>
        </div>
      </Layout>
    );
  }

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
