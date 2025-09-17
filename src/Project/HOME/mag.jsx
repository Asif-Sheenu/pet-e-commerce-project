import React from "react";

export default function Magazine() {
  const articles = [
    {
      id: 1,
      date: "MARCH 15, 2019",
      title: "Lorem ipsum dolor consectetur adipisci blandit ierdietn",
      image: "https://www.homeopet.com/wp-content/uploads/2018/07/Love-Cats.jpg",
    },
    {
      id: 2,
      date: "MARCH 15, 2019",
      title: "Lorem ipsum dolor consectetur adipisci blandit ierdietn",
      image: "https://w0.peakpx.com/wallpaper/776/164/HD-wallpaper-animal-cat-dog.jpg",
      highlight: true,
    },
    {
      id: 3,
      date: "MARCH 15, 2019",
      title: "Lorem ipsum dolor consectetur adipisci blandit ierdietn",
      image: "https://i.pinimg.com/474x/0c/8f/44/0c8f447d52341058cd433920de3e9582.jpg",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-sans">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left - Big Image */}
        <img
          src="https://www.shutterstock.com/image-photo/woman-kiss-selfie-dog-on-600nw-2575882875.jpg"
          alt="Magazine Main"
          className="rounded-lg shadow-md"
        />

        {/* Right - Text */}
        <div>
          <h2 className="text-5xl font-bold text-gray-800">MAGAZINE</h2>
          <p className="text-gray-400 text-sm mt-4">MARCH 15, 2019</p>
          <p className="text-gray-700 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit blandit
            imperdietn imperdiet.
          </p>
          <p className="text-gray-600 mt-2">
            Integer ut nunc sit amet eros mollis facilisis hendrerit at nulla.
            Etiam eleifend est, vel pulvinar leo. Donec pharetra elit quis
            mauris ultricies volu urabitur eu nunc eget mi ullamcorper rutrum.
          </p>
        </div>
      </div>

      {/* Articles Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="relative rounded-lg overflow-hidden shadow-md group cursor-pointer"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition"
            />
            <div
              className={`absolute bottom-0 left-0 w-full p-4 ${
                article.highlight
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <p
                className={`text-xs font-semibold ${
                  article.highlight ? "text-white" : "text-gray-500"
                }`}
              >
                {article.date}
              </p>
              <h3 className="text-sm font-semibold">{article.title}</h3>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
}
