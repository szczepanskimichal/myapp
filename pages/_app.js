import { CartContextProvider } from "@/components/CartContext";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8} // defines the spacing between toasts in pixels.
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "20px",
            padding: "8px 16px",
            display: "inline-flex",
            justifyContent: "space-between",
            alignItems: "center",
            whiteSpace: "nowrap",
          },
        }}
      />
      <Component {...pageProps} />
    </CartContextProvider>
  );
}
