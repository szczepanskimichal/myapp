import { CartContextProvider } from "@/components/CartContext";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <CartContextProvider>
        <Toaster
          position="top-center"
          reverseOrder={false} //keeps the order of the toasts as they are triggered.
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
    </SessionProvider>
  );
}
