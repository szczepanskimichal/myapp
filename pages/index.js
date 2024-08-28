import Header from "../components/Header";
import Featured from "../components/Featured";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import NewProducts from "@/components/NewProducts";

export default function Home({ featuredProduct, newProducts }) {
  return (
    <div className="flex flex-col">
      <div className="h-screen flex flex-col">
        <Header />
        <Featured product={featuredProduct} />
      </div>
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "66964e512c84a13a661c4eb6";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find().sort({ createdAt: -1 }).limit(10);

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
