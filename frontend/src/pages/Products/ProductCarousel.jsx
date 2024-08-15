import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaReact,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import Loader from "../../components/Loader";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  console.log(products);

  //   if (isLoading) {
  //     <Loader />;
  //   }

  const setting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4   xl:block lg:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          {...setting}
          className="xl:w-[41rem] lg:w-[38rem] md:w-[45rem] sm:w-[40rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-[100%] rounded-lg object-fit h-[30rem]"
                />
                <div className="flex justify-normal w-[20rem]">
                  <div className="one w-[23rem]">
                    <h2>{name}</h2>
                    <p>${price}</p>
                    <br />
                    <br />
                    <p className="w-[25rem]">{description.substring(0, 160)}</p>
                  </div>

                  <div className="flex justify-between w-[10rem]">
                    <div className="one grid">
                      <h2 className="flex items-center mb-6 w-[8rem]">
                        <FaStore className="mr-2 text-white " /> Brand: {brand}
                      </h2>
                      <h2 className="flex items-center mb-6 w-[10rem]">
                        <FaClock className="mr-2 text-white " /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h2>
                      <h2 className="flex items-center mb-6 w-[8rem]">
                        <FaStar className="mr-2 text-white " /> Reviews:{" "}
                        {numReviews}
                      </h2>
                    </div>
                    <div className="two grid">
                      <h1 className="flex items-center mb-6 w-[8rem]">
                        <FaStar className="mr-1 text-white"/>
                        Ratings : {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[8rem]">
                        <FaShoppingCart className="mr-1 text-white"/>
                        Quantity : {quantity}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[8rem]">
                        <FaBox className="mr-1 text-white"/>
                        In Stock : {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
