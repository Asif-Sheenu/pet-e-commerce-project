import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Newnavbar from "./HOME/newnavbar";

export default function ProductDetail() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`) 
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <p className="text-center mt-20">Loading...</p>;

  return (
    <>
   <Newnavbar/>
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">

        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-80 object-contain rounded-xl shadow-md"
          />
        </div>


        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-4">{product.descreption}</p>


          <div className="flex items-center gap-3 mb-6">
            <span className="text-lg text-gray-400 line-through">
              ₹{product.old_price}
            </span>
            <span className="text-2xl font-bold text-red-600">
              ₹{product.new_price}
            </span>
          </div>


          <div className="flex gap-4">
            <button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition">
              🛒 Add to Cart
            </button>
            <button className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition">
              ⚡ Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  
   </>);
}
