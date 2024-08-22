import { Link } from "react-router-dom";
import Cart from "../cart/Cart";
import "./Header.css"; // Ensure to include any additional styles if needed

export default function Header({ sortBy, setSortBy }) {
  return (
    <header className="bg-base-100 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          LOGO
        </Link>

        <div className="flex items-center space-x-4">
          <select
            name="price"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered select-primary"
          >
            <option value="">none</option>
            <option value="cheap">cheap</option>
            <option value="expensive">expensive</option>
          </select>

          <Cart />
        </div>
      </div>
    </header>
  );
}
