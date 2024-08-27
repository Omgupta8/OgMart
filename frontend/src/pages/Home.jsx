import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Message from "../components/Message";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  //   console.log(keyword);

  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <>
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      </>
    );
  }
  // console.log(data.products);
  return (
    <>
      {!keyword ? <Header /> : null}
      <>
        <div className="flex justify-between items-center">
          <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
            Special Products
          </h1>
          <br />

          <Link
            to="/shop"
            className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
          >
            Shop
          </Link>
        </div>
        <div className="flex flex-wrap justify-evenly">
          {data.products.map((product) => (
            <div key={product._id}>
              <Product product={product} />
            </div>
          ))}
        </div>
      </>
    </>
  );
};

export default Home;
