import { CartContext } from "@/components/CartContext";
import Layout from "@/components/Layout";
import Table from "@/components/Table";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {
  const { cartProducts, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //     if (cartProducts.length > 0) {

  //     }
  // })

  return (
    <Layout>
      <div className="flex justify-center p-5 sm:p-10">
        <div className="sm:min-w-[40rem] sm:w-[70%] flex flex-col sm:grid grid-cols-3 gap-10">
          <div className="box p-5 col-span-2 text-sm sm:text-normal">
            {!cartProducts?.length && <h3>Your cart is empty</h3>}
            {products?.length > 0 && (
              <>
                <h3>Cart</h3>
                <Table products={products} cartProducts={cartProducts} />
              </>
            )}
          </div>
          <div className="box p-5"></div>
        </div>
      </div>
    </Layout>
  );
}
