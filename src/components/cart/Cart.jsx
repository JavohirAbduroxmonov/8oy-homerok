import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Cart.scss"; // Ensure this file contains additional custom styles if needed

export default function Cart() {
  const cart = useSelector((store) => store.cart);
  const itemCount = cart.length;

  return (
    <Link
      to="/cart"
      className="btn btn-primary btn-outline flex items-center space-x-2 relative"
    >
      <FaShoppingCart className="text-2xl" />
      {itemCount > 0 && (
        <span className="badge badge-secondary absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
