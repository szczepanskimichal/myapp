import Header from "../components/Header";
import Featured from "../components/Featured";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import NewProducts from "@/components/NewProducts";
import { Category } from "@/models/Category";

export default function Home({ featuredProduct, newProducts, categories }) {
  return (
    <div className="flex flex-col">
      <div className="h-screen flex flex-col">
        <Header categories={categories} />
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
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  const categories = await Category.find();
  categories.sort((a, b) => a.name.localeCompare(b.name));
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
