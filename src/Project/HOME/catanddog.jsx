import React from "react";
import { Link } from "react-router-dom";

const dogBestSellers = [
  {
      "id": "22",
      "name": "Drools Puppy Food",
      "descreption": "Special nutrition for growing puppies",
      "img": "https://m.media-amazon.com/images/I/71mNQx73DZL._AC_UL480_FMwebp_QL65_.jpg",
      "category": "dogs",
      "oldPrice": 600,
      "price": 450,
      "status": "active",
          discount: "20% Off",

    },
    {
      "id": "23",
      "name": "Dog Chew Toy Bone",
      "descreption": "Durable chew bone toy for dogs",
      img: "https://m.media-amazon.com/images/I/419H3PgfLsL._AC_UL480_FMwebp_QL65_.jpg",
      "category": "dogs",
      "oldPrice": 250,
      "price": 199,
      "status": "active",
          discount: "20% Off",

    },
    {
      id: "24",
      name: "Dog Leash Nylon",
      "descreption": "Strong and durable nylon leash",
      img: "https://m.media-amazon.com/images/I/71mv7oAPiaL._AC_UL480_FMwebp_QL65_.jpg",
      "category": "dogs",
      oldPrice: 320,
      price: 250,
      "status": "active",
          discount: "20% Off",

    },
];

const catBestSellers = [
{
      "id": "32",
      "name": "Cat Treats Chicken",
      "descreption": "Crunchy chicken flavored treats for cats",
      "img": "https://m.media-amazon.com/images/I/716dG1dwvtL._AC_UL480_FMwebp_QL65_.jpg",
      "category": "cats",
      "oldPrice": 280,
      "price": 220,
      "status": "active"
    },
    {
      "id": "33",
      "name": "Cat Carrier Bag",
      "descreption": "Portable travel bag for cats with mesh ventilation",
      "img": "https://m.media-amazon.com/images/I/81LAeNYWMEL._AC_UL480_FMwebp_QL65_.jpg",
      "category": "cats",
      "oldPrice": 1200,
      "price": 999,
      "status": "active"
    },
    {
      "id": "34",
      "name": "Cat Water Fountain",
      "descreption": "Automatic water dispenser for cats",
      "img": "https://m.media-amazon.com/images/I/61WQ3IgHSYL._AC_UL480_FMwebp_QL65_.jpg",
      "category": "cats",
      "oldPrice": 1500,
      "price": 1250,
      "status": "active"
    },
];

export default function BestSellers() {
  const renderCard = (product) => (
    <div
      key={product.id}
      className="relative bg-white/60 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transform transition duration-300 p-6 flex flex-col group"
    >
      <span className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
        {product.discount}
      </span>

   
      <Link to={`/product/${product.id}`}>
        <img
          src={product.img}
          alt={product.name}
          className="h-44 object-contain mx-auto transition-transform duration-300 group-hover:scale-110"
        />
      </Link>

    
      <div className="mt-5 text-xl font-extrabold text-gray-900 tracking-wide">
        {product.price}
        <span className="ml-2 text-sm text-gray-400 line-through">
          {product.oldPrice}
        </span>
      </div>

      <p className="text-sm text-gray-700 mt-2 flex-grow leading-relaxed group-hover:text-gray-900 transition">
        {product.name}
      </p>

     
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-br grey-400 px-6 font-[Poppins]">
      <h2 className="text-5xl font-extrabold text-center mb-16 text-gray-900 tracking-wide">
        Best Sellers
      </h2>

      <div className="mb-16">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
        
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {dogBestSellers.map(renderCard)}
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
         
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {catBestSellers.map(renderCard)}
        </div>
      </div>
    </section>
  );
}
