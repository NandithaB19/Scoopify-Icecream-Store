import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-pink-100 via-orange-100 to-yellow-100">
      {/* HERO SECTION */}
      <div className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30 top-10 left-20"></div>
        <div className="absolute w-72 h-72 bg-yellow-300 rounded-full blur-3xl opacity-30 bottom-10 right-20"></div>

        <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl relative z-10">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-bold text-pink-600 mb-4">
              Welcome to Scoopify 🍦
            </h1>

            <p className="text-2xl font-semibold text-pink-600 mb-6">
              Scoop the Joy, Taste the Magic ✨
            </p>

            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              Indulge in creamy scoops crafted with fresh ingredients and
              natural fruits. At Scoopify, every scoop is a delightful
              experience — customize your favorite ice creams with delicious
              toppings and enjoy a sweet moment in every scoop.
            </p>

            <Link
              to="/products"
              className="bg-pink-500 text-white px-6 py-3 rounded-lg
              hover:bg-pink-600 transition shadow-lg
              hover:shadow-pink-400/50 animate-pulse"
            >
              Explore Ice Creams
            </Link>
          </div>

          <img
            src="/images/ScoopifyLogo.jpeg"
            alt="Ice Cream"
            className="w-full max-w-[500px] rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* FEATURED ICE CREAMS */}
      <div className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Featured Ice Creams 🍨</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-pink-600 mb-2">
              Lychee Lagoon 🍧
            </h3>

            <p className="text-gray-600">
              A refreshing scoop crafted using real lychee fruit, offering a
              naturally sweet and smooth texture. Made with fresh ingredients,
              it delivers a light, juicy experience that feels cool and
              refreshing with every bite.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-pink-600 mb-2">
              Mango Magic 🥭
            </h3>

            <p className="text-gray-600">
              Prepared with real mango pulp sourced from natural fruits, this
              creamy scoop delivers a rich and smooth texture. The sweetness of
              fresh mango creates a vibrant and refreshing dessert experience.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-pink-600 mb-2">
              Coconut Paradise 🥥
            </h3>

            <p className="text-gray-600">
              Made using fresh coconut and natural ingredients, this scoop
              offers a silky smooth texture and refreshing taste. The gentle
              sweetness of coconut creates a relaxing tropical dessert
              experience.
            </p>
          </div>
        </div>
      </div>

      {/* WHY SCOOPIFY */}
      <div className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Why Scoopify ⭐</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-pink-600 mb-3">
              Fresh Ingredients 🍓
            </h3>

            <p className="text-gray-600">
              Every scoop is crafted using high‑quality fresh ingredients to
              ensure the richest flavors and the creamiest texture.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-pink-600 mb-3">
              Custom Toppings 🍫
            </h3>

            <p className="text-gray-600">
              Personalize your ice cream with a wide range of toppings including
              chocolate chips, caramel drizzle, nuts and more.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-pink-600 mb-3">
              Quick Ordering ⚡
            </h3>

            <p className="text-gray-600">
              Scoopify offers a smooth and fast ordering experience so you can
              get your favorite ice creams without any hassle.
            </p>
          </div>
        </div>
      </div>

      {/* CUSTOMER REVIEWS */}
      <div className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Customer Reviews 💬</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <p>"Best ice cream ordering app I've used!"</p>
            <p className="mt-3 font-semibold">— Radha</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <p>"Loved the toppings customization!"</p>
            <p className="mt-3 font-semibold">— Rahul</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <p>"Super smooth ordering experience."</p>
            <p className="mt-3 font-semibold">— Krishna</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
