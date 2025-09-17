import React from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Royal Canin Medium Adult Dry Dog Food",
    img: "https://i.ibb.co/F6rrjMw/dogfood1.png", // replace with your image
    oldPrice: "AED 147",
    price: "AED 117.60",
    discount: "20% Off",
    options: ["4KG", "10KG", "15KG"],
  },
  {
    id: 2,
    name: "Royal Canin Mini Adult Dry Dog Food",
    img: "https://i.ibb.co/vxxLJ3r/dogfood2.png",
    oldPrice: "AED 46.5",
    price: "AED 37.20",
    discount: "20% Off",
    options: ["800G", "2KG", "4KG"],
  },
  {
    id: 3,
    name: "Orijen Original Protein-Rich Adult Dog Dry Food",
    img: "https://i.ibb.co/cvnrT2y/dogfood3.png",
    oldPrice: "AED 149",
    price: "AED 119.20",
    discount: "20% Off",
    options: ["2KG", "6KG"],
  },
  {
    id: 4,
    name: "Taste Of The Wild Pacific Stream Adult Canine Formula",
    img: "https://i.ibb.co/YfMh7wM/dogfood4.png",
    oldPrice: "AED 115",
    price: "AED 92.00",
    discount: "20% Off",
    options: ["2KG", "12.2KG"],
  },
  {
    id: 5,
    name: "Acana Yorkshire Pork Dog Grain-Free Dry Food",
    img: "https://i.ibb.co/6r9rFJJ/dogfood5.png",
    oldPrice: "AED 129",
    price: "AED 103.20",
    discount: "20% Off",
    options: ["2KG"],
  },
  {
    id: 6,
    name: "Lily's Kitchen Countryside Casserole With Chicken, Duck &...",
    img: "https://i.ibb.co/Lh6Xjjm/dogfood6.png",
    oldPrice: "AED 73.5",
    price: "AED 58.80",
    discount: "20% Off",
    options: ["1KG", "2.5KG", "7KG"],
  },
];

export default function DogFoodSection() {
  return (
    <section className="py-12 bg-white px-6">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Top Selling Dog Food
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded absolute">
              SALE
            </span>
            <Link to={`/product/${product.id }`}key={product.id}>
            <img
              src={product.img}
              alt={product.name}
              className="h-40 object-contain mx-auto"
            />
            </Link>
            

            <div className="mt-3 text-sm text-red-600 font-bold">
              {product.discount}
            </div>

            <div className="text-lg font-semibold text-gray-800">
              {product.price}
            </div>
            <div className="text-gray-400 line-through">{product.oldPrice}</div>

            <p className="text-sm text-gray-700 mt-2 flex-grow">
              {product.name}
            </p>

            <div className="flex gap-2 flex-wrap mt-2">
              {product.options.map((opt, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs border rounded bg-gray-100"
                >
                  {opt}
                </span>
              ))}
            </div>

            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm">
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
