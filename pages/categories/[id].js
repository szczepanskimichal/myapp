import Layout from "@/components/Layout";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { FaArrowLeft } from "react-icons/fa";

export default function CategoryPage({
  category,
  products,
  parent,
  properties,
  productIds,
}) {
  return (
    <Layout>
      <div className="flex flex-col items-center gap-10 p-5">
        <div className="lg:min-w-[50rem] xl:min-w-[70rem] flex flex-col sm:flex-row gap-5 items-center justify-between">
          <div className="flex gap-5 items-center">
            <h2 className="mb-0">{category.name}</h2>
            {parent && (
              <span className="flex gap-5 items-center">
                <FaArrowLeft className="size-5" />
                <h2 className="mb-0">{parent.name}</h2>
              </span>
            )}
          </div>
          <div className="flex gap-5">
            {properties.map((property) => (
              <div
                key={property.name}
                className="bg-white p-2 rounded-md flex gap-2 items-center shadow-md"
              >
                <div className="whitespace-nowrap capitalize">
                  {property.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  await mongooseConnect();

  const category = await Category.findById(id);
  const parentId = category?.parent;
  const parent = await Category.findById(parentId);
  const categories = await Category.find();

  const childCategoryIds = categories.filter(
    (category) => category.parent?._id.toString() === id
  );

  const categoryProducts = await Product.find({ category: id }).sort({
    id: -1,
  });

  const childProductsPromises = childCategoryIds.map((childId) =>
    Product.find({ category: childId }).sort({ id: -1 })
  );
  const childProducts = await Promise.all(childProductsPromises);

  const products = categoryProducts.concat(...childProducts);
  const productIds = products.map((product) => product.id);

  let properties = [];

  if (category?.properties) {
    properties.push(...category.properties);
  }
  if (parent?.properties && !Object.keys(category.properties).length) {
    properties.push(...parent.properties);
  }

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      parent: JSON.parse(JSON.stringify(parent)),
      properties: JSON.parse(JSON.stringify(properties)),
      products: JSON.parse(JSON.stringify(products)),
      productIds: JSON.parse(JSON.stringify(productIds)),
    },
  };
}
