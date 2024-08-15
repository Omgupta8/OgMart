import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "./redux/api/productApiSlice";
import Loader from "./components/Loader";
import Header from "./components/Header";

const Home = () => {
  const { keyword } = useParams();
//   console.log(keyword);

  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <h1>Error</h1>;
  }
  //   console.log(data.products);
  return (
    <>
        {!keyword ? <Header /> : null}
      
    </>
  );
};

export default Home;
