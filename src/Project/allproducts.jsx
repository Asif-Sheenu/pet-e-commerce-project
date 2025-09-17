import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Newnavbar from "./HOME/newnavbar";
import { useCart } from "./cartcontest";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div>
      <Newnavbar />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 p-8">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900 tracking-tight">
          🐾 Premium Pet Collection
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl: gap-8">
          {products
            .filter((item) => item.status?.toLowerCase() === "active")
            .map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col border border-gray-100"
              >
                {/* Image */}
                <div className="h-56 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 relative">
                  <Link to={`/product/${item.id}`} key={item.id}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-44 object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </Link>
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                    Sale
                  </span>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="text-lg font-bold text-gray-800 truncate mb-1">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {item.descreption}
                  </p>

                  {/* Price */}
                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-gray-400 line-through">
                        ₹{item.old_price}
                      </span>
                      <span className="text-2xl font-extrabold text-amber-600">
                        ₹{item.new_price}
                      </span>
                    </div>

                    {/* Button */}
                    <button
                      onClick={() =>
                        addToCart({
                          id: item.id,
                          name: item.name,
                          image: item.image,
                          price: item.new_price,
                        })
                      }
                      className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold py-2.5 rounded-xl shadow-md hover:from-amber-600 hover:to-yellow-600 hover:shadow-lg transition-all duration-300"
                    >
                      Add to Cart 🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
