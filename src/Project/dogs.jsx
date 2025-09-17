import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Dogs = () => {
  const { dog } = useParams(); 
  const [dogProducts, setDogProducts] = useState([]); 
console.log (dog)
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {

        const filtered = res.data.filter(
          (item) => item.category?.toLowerCase() === dog.toLowerCase()
        );
        setDogProducts(filtered);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [dog]); 

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dogProducts.map((item) => (
        <div
          key={item.id}
          className="bg-white shadow-md rounded-xl p-4 text-center hover:shadow-lg transition"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 mx-auto object-contain"
          />
          <h2 className="font-bold mt-2">{item.name}</h2>
          <p className="text-sm text-gray-500">{item.category}</p>
          <p className="mt-2 text-yellow-600 font-semibold">
            ₹{item.new_price}{" "}
            <span className="line-through text-gray-400">₹{item.old_price}</span>
          </p>
        </div>
      ))}
    </div>
  );
};
