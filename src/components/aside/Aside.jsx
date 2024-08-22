import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  saveColors,
  setLoading as setColorsLoading,
  setError as setColorsError,
} from "../../store/colorsSlice";
import {
  saveBrands,
  setLoading as setBrandsLoading,
  setError as setBrandsError,
} from "../../store/brandsSlice";

export default function Aside({
  selectedBrand,
  setSelectedBrand,
  selectedColor,
  setSelectedColor,
}) {
  const { colors, brands } = useSelector((store) => store);
  const {
    loading: colorsLoading,
    error: colorsError,
    colors: colorsList,
  } = colors;
  const {
    loading: brandsLoading,
    error: brandsError,
    brands: brandsList,
  } = brands;

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchColors() {
      dispatch(setColorsLoading(true));
      try {
        const response = await fetch(
          "https://headphones-server.onrender.com/colors"
        );

        if (!response.ok) {
          throw new Error("Error fetching colors");
        }

        const fetchedColors = await response.json();
        dispatch(saveColors(fetchedColors));
      } catch (error) {
        dispatch(setColorsError(error.message));
      } finally {
        dispatch(setColorsLoading(false));
      }
    }

    async function fetchBrands() {
      dispatch(setBrandsLoading(true));
      dispatch(setBrandsError(null));
      try {
        const response = await fetch(
          "https://headphones-server.onrender.com/brands"
        );

        if (!response.ok) {
          throw new Error("Error fetching brands");
        }

        const fetchedBrands = await response.json();
        dispatch(saveBrands(fetchedBrands));
      } catch (error) {
        dispatch(setBrandsError(error.message));
      } finally {
        dispatch(setBrandsLoading(false));
      }
    }

    fetchColors();
    fetchBrands();
  }, [dispatch]);

  return (
    <aside className="p-4 bg-base-100 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Brands</h2>
      {brandsLoading && <div className="text-gray-500">Brands loading...</div>}
      {brandsError && <div className="text-red-500">{brandsError}</div>}
      <ul className="space-y-2">
        {brandsList.map((brand) => (
          <li key={brand} className="flex items-center space-x-2">
            <input
              type="radio"
              id={brand}
              name="brand"
              className="radio"
              onChange={() => setSelectedBrand(brand)}
              checked={selectedBrand === brand}
            />
            <label htmlFor={brand} className="text-gray-700">
              {brand}
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setSelectedBrand("")}
        className="btn btn-secondary mt-2"
      >
        Reset
      </button>

      <h2 className="text-lg font-semibold mt-4 mb-2">Colors</h2>
      {colorsLoading && <div className="text-gray-500">Colors loading...</div>}
      {colorsError && <div className="text-red-500">{colorsError}</div>}
      <ul className="flex flex-wrap gap-2 mt-2">
        {colorsList.map((color) => (
          <li key={color}>
            <button
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full border ${
                selectedColor === color ? "border-red-500" : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            ></button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setSelectedColor("")}
        className="btn btn-secondary mt-2"
      >
        Reset
      </button>
    </aside>
  );
}
