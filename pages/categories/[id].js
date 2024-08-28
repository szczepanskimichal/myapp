import Layout from "@/components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { FaArrowLeft } from "react-icons/fa";

export default function CategoryPage({ category, parent }) {
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
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  await mongooseConnect();
  const category = await Category.findById(id);
  const parent = category?.parent
    ? await Category.findById(category.parent)
    : null;

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      parent: JSON.parse(JSON.stringify(parent)),
    },
  };
}
