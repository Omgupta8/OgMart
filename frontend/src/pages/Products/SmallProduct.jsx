import { Link } from "react-router-dom";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] h-[100%] ml-[2rem] p-5 flex justify-between">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-[100%] w-[100%] rounded object-fill "
        />
        {/* <HeartIcon product={product}/> */}

        <div className="p-54">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between items-center">
              <div>{product.name}</div>
              <span className="bg-pink-100 hover:bg-pink-500 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300 mt-2 ">
                ${product.price}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
