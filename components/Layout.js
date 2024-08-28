import { useState, useEffect } from "react";
import Header from "./Header";

export default function Layout({ children }) {
  const [categories, setCategories] = useState([]);

  return (
    <div className="flex flex-col min-h-[100vh] bg-gray-300">
      <Header />
      <div className="min-h-screen sm:pt-[80px] flex justify-center">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
