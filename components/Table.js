import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Table() {
  const { removeProduct, addProduct, clearCart } = useContext(CartContext);

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  return (
    <table>
      <thead>
        <tr>
          <td>Product name</td>
          <td>Quantity</td>
          <td>Price</td>
        </tr>
      </thead>
    </table>
  );
}
