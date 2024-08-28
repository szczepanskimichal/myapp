export default function NewProducts({ products }) {
  return (
    <div
      id="Products"
      className="flex flex-col items-center w-full bg-gray-300"
    >
      <div className="w-[80%] flex flex-col gap-5 mb-5">
        <h2>New Arrivals</h2>
      </div>
      <div>
        {products?.length > 0 &&
          products.map((product, index) => (
            <div
              key={index}
              className="flex flex-col gap-5 sm: grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
            >
              <img src={product.images[0]} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
