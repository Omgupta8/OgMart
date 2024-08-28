import { useSelector } from "react-redux";

const CartCount = () => {
  const cart = useSelector((state) => state.cart);
  const cartCount= cart.cartItems.length;

  return (
    <div className="absolute left-4 top-9">
      {cartCount > 0 && (
        <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
          {cartCount}
        </span>
      )}
    </div>
  );
};

export default CartCount;
