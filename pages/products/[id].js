import Layout from "@/components/Layout";
import ProductImages from "@/components/ProductImages";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";

export default function ProductPage({ product, category }) {
  console.log(product.properties);
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="md:w-[80%] flex flex-col items-start justify-center md:flex-row gap-10 p-10 md:px-5 xl:p-10">
          <motion.div
            variants={fadeIn("right", "spring", 0.1, 1)}
            initial="hidden"
            whileInView="show"
            className="box w-full min-w-[20rem] max-w-[25rem] p-5"
          >
            <ProductImages images={product.images} />
          </motion.div>
          <motion.div
            variants={fadeIn("left", "spring", 0.3, 1)}
            initial="hidden"
            whileInView="show"
            className="col-span-2"
          >
            <h2>{product.title}</h2>
            <h3 className="text-gray-500">{category?.name || "No Category"}</h3>
            <div className="flex gap-5 my-5">
              {product.properties &&
                Object.entries(product.properties).map(([name, value]) => (
                  <div
                    key={name}
                    className="bg-white p-2 rounded-md flex gap-2 items-center shadow-md"
                  >
                    <div className="whitespace-nowrap capitalize">{name}:</div>
                    <div className="capitalize">{value}</div>
                  </div>
                ))}
            </div>
            <div className="flex gap-5 items-center mt-5">
              <h2 className="mb-0">${product.price}</h2>
              <button className="btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  const category = await Category.findById(product.category);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      category: JSON.parse(JSON.stringify(category)),
    },
  };
}
