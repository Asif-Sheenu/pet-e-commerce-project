import React from "react";
import { Link } from "react-router-dom";

export default function Mid() {
  const cards = [
    {
      id:"1",
      title: "FOR DOG ",
      color: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700",
      icon: "https://cdn-icons-png.flaticon.com/128/12452/12452249.png",
      pointer: true,
      category:"dog"
    },
    
    {
      id:"2",
      title: "FOR CATS",
      color: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700",
      icon: "https://cdn-icons-png.flaticon.com/128/7104/7104207.png",
      pointer: true,
      category:"cat"
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex justify-center gap-10 flex-wrap">
        {cards.map((card, i) => (
          <Link key={card.id} to={`/Mid/${card.category}`}>
          <div 
            
            className={`${card.color} text-white rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-500 backdrop-blur-md
              ${card.pointer ? "cursor-pointer hover:scale-110 hover:shadow-[0_0_25px_rgba(255,215,0,0.7)] hover:bg-gradient-to-br hover:from-yellow-500 hover:to-yellow-600" : "opacity-90"}`}
          >
            <div className="bg-white/10 p-4 rounded-full shadow-inner mb-5">
              <img
                src={card.icon}
                alt={card.title}
                className="w-16 h-16 object-contain"
              /> 
            </div>
            <h2 className="text-xl font-semibold tracking-wide">{card.title}</h2>
            <div className="mt-3 w-12 h-1 bg-yellow-400 rounded-full"></div>
          </div>
          </Link>
          
        ))}
      </div>
    </div>
  );
}
