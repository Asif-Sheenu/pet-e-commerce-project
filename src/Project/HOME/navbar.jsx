import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    if (savedLogin === "true") setIsLoggedIn(true);
  }, []);


  const handleAuth = () => {
  if (isLoggedIn) {

    setIsLoggedIn(false);

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    navigate("/login");
  } else {
    
    setIsLoggedIn(true);

    localStorage.setItem("isLoggedIn", "true");
    navigate("/login"); 
  }
};


  const bgUrl = "new.png";

  return (
    <div
      className="min-h-screen bg-cover bg-center font-sans w-full relative"
      style={{ backgroundImage: `url('${bgUrl}')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      <div className="relative z-10 min-h-screen flex flex-col">

        <header className="backdrop-blur-md bg-black/30 shadow-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center">

            <div className="flex items-center mb-2 sm:mb-0">
              <img
                src="https://t4.ftcdn.net/jpg/15/41/98/79/240_F_1541987928_4BivdzsPXKqHqj4kEzJ2Ag3wBWoHORf6.jpg"
                alt="DogBible Logo"
                className="w-14 h-12 mr-2 rounded-full shadow-md"
              />
              <span className="text-white font-extrabold text-2xl tracking-wide">
                Paw
              </span>
              <span className="text-yellow-400 font-extrabold text-2xl tracking-wide">
                Fect
              </span>
            </div>


            <div className="flex items-center space-x-6">
              <nav className="flex space-x-6 text-white text-sm font-medium">
                <Link
                  to="/allproducts"
                  className="hover:text-yellow-300 transition"
                >
                  All Products
                </Link>
                <Link
                  to="/about"
                  className="hover:text-yellow-300 transition"
                >
                  About
                </Link>
              </nav>
              <button
                onClick={handleAuth}
                className="bg-yellow-400 text-gray-900 px-5 py-2 rounded-full text-sm font-semibold hover:bg-yellow-300 shadow-md transition"
              >
                {isLoggedIn ? "SIGN OUT" : "SIGN IN"}
              </button>
            </div>
          </div>
        </header>

      
        <section className="flex-grow flex items-center">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
         
            <div className="bg-white/10 backdrop-blur-lg text-white rounded-2xl p-10 max-w-md shadow-xl border border-white/20">
              <h1 className="text-4xl font-extrabold mb-4 leading-tight">
                Whether <span className="text-yellow-500">BIG</span> or{" "}
                <span className="text-yellow-500">SMALL</span>, <br />
                <span className="text-yellow-600">WE HAVE ALL</span>
              </h1>
              <p className="text-gray-200 text-lg mb-6">
                Discover premium products tailored for every dog.  
                From playful pups to loyal giants.
              </p>
              <button onClick={()=>{navigate("/allproducts")}} className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 shadow-md transition">
               
                Explore Now
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
