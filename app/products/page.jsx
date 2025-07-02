"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Products", icon: "🛒", color: "gray" },
    { id: "vegetables", label: "Vegetables", icon: "🥬", color: "green" },
    { id: "grains", label: "Rice", icon: "🌾", color: "amber" },
  ];

  const products = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      category: "vegetables",
      price: 45,
      unit: "per kg",
      minOrder: 100,
      maxOrder: 5000,
      image: "/images/vege1.png",
      origin: "Punjab Farms",
      inStock: true,
      description:
        "Premium quality vine-ripened tomatoes, perfect for cooking and fresh consumption.",
      nutritionalInfo: "Rich in Vitamin C, Lycopene, and Potassium",
      harvestDate: "2024-03-10",
      shelfLife: "7-10 days",
      farmer: "Hassan Ali Farm",
      certifications: ["Organic", "Pesticide-Free"],
      rating: 4.8,
      reviews: 127,
    },
    {
      id: 2,
      name: "Red Onions",
      category: "vegetables",
      price: 35,
      unit: "per kg",
      minOrder: 100,
      maxOrder: 3000,
      image: "/images/vege2.png",
      origin: "Sindh Farms",
      inStock: true,
      description:
        "Fresh, pungent red onions with excellent storage life and rich flavor.",
      nutritionalInfo: "High in Vitamin C, Fiber, and Antioxidants",
      harvestDate: "2024-03-08",
      shelfLife: "30-45 days",
      farmer: "Malik Brothers Farm",
      certifications: ["Natural", "Non-GMO"],
      rating: 4.6,
      reviews: 89,
    },
    {
      id: 3,
      name: "Potato Premium",
      category: "vegetables",
      price: 30,
      unit: "per kg",
      minOrder: 200,
      maxOrder: 10000,
      image: "/images/vege3.png",

      origin: "KPK Highlands",
      inStock: true,
      description:
        "High-quality potatoes, ideal for cooking, frying, and commercial use.",
      nutritionalInfo: "Rich in Carbohydrates, Vitamin C, and Potassium",
      harvestDate: "2024-03-05",
      shelfLife: "45-60 days",
      farmer: "Mountain View Farms",
      certifications: ["Organic", "Premium Grade"],
      rating: 4.9,
      reviews: 203,
    },

    {
      id: 6,
      name: "Basmati Rice",
      category: "grains",
      price: 120,
      unit: "per kg",
      minOrder: 500,
      maxOrder: 50000,
      image: "/images/vege6.png",

      origin: "Punjab Rice Mills",
      inStock: true,
      description:
        "Premium aged Basmati rice with long grains and aromatic fragrance.",
      nutritionalInfo: "Rich in Carbohydrates and Protein",
      harvestDate: "2023-11-15",
      shelfLife: "12-18 months",
      farmer: "Golden Grain Cooperative",
      certifications: ["Aged 2 Years", "Export Quality"],
      rating: 4.9,
      reviews: 342,
    },
    {
      id: 7,
      name: "Green Chilies",
      category: "vegetables",
      price: 80,
      unit: "per kg",
      minOrder: 50,
      maxOrder: 1000,
      image: "/images/vege7.png",
      origin: "Sindh Farms",
      inStock: true,
      description:
        "Fresh, spicy green chilies perfect for cooking and food processing.",
      nutritionalInfo: "High in Vitamin C and Capsaicin",
      harvestDate: "2024-03-13",
      shelfLife: "7-10 days",
      farmer: "Spice King Farm",
      certifications: ["Fresh", "Pesticide-Free"],
      rating: 4.4,
      reviews: 76,
    },

    {
      id: 9,
      name: "White Onions",
      category: "vegetables",
      price: 40,
      unit: "per kg",
      minOrder: 100,
      maxOrder: 3000,
      image: "/images/vege2.png",
      origin: "Punjab Farms",
      inStock: true,
      description:
        "Mild-flavored white onions, perfect for cooking and salads.",
      nutritionalInfo: "Good source of Vitamin C and Antioxidants",
      harvestDate: "2024-03-07",
      shelfLife: "25-35 days",
      farmer: "Crescent Farm",
      certifications: ["Natural", "Fresh"],
      rating: 4.3,
      reviews: 67,
    },

    {
      id: 11,
      name: "Wheat Grain",
      category: "grains",
      price: 55,
      unit: "per kg",
      minOrder: 1000,
      maxOrder: 100000,
      image: "/images/vege4.png",
      origin: "Punjab Wheat Belt",
      inStock: true,
      description:
        "High-quality wheat grain suitable for flour production and commercial use.",
      nutritionalInfo: "Rich in Protein, Fiber, and B Vitamins",
      harvestDate: "2024-04-20",
      shelfLife: "12 months",
      farmer: "Golden Fields Cooperative",
      certifications: ["Clean Grain", "Moisture Controlled"],
      rating: 4.6,
      reviews: 198,
    },
    {
      id: 12,
      name: "Fresh Carrots",
      category: "vegetables",
      price: 50,
      unit: "per kg",
      minOrder: 100,
      maxOrder: 2000,
      image: "/images/vege5.png",
      origin: "Quetta Farms",
      inStock: true,
      description:
        "Crisp, sweet carrots packed with nutrients and natural sweetness.",
      nutritionalInfo: "High in Beta-Carotene and Vitamin A",
      harvestDate: "2024-03-09",
      shelfLife: "21-30 days",
      farmer: "Valley Fresh Farms",
      certifications: ["Organic", "Premium"],
      rating: 4.5,
      reviews: 112,
    },
    {
      id: 13,
      name: "Fresh Spinach",
      category: "vegetables",
      price: 25,
      unit: "per kg",
      minOrder: 100,
      maxOrder: 1000,
      image: "/images/vege6.png",
      origin: "Punjab Farms",
      inStock: true,
      description:
        "Fresh, leafy spinach rich in iron and nutrients, perfect for healthy cooking.",
      nutritionalInfo: "High in Iron, Folate, and Vitamin K",
      harvestDate: "2024-03-14",
      shelfLife: "3-5 days",
      farmer: "Green Leaf Farm",
      certifications: ["Organic", "Fresh Picked"],
      rating: 4.3,
      reviews: 85,
    },
    {
      id: 14,
      name: "Fresh Cauliflower",
      category: "vegetables",
      price: 55,
      unit: "per kg",
      minOrder: 100,
      maxOrder: 2000,
      image: "/images/vege7.png",
      origin: "KPK Farms",
      inStock: true,
      description:
        "Fresh, white cauliflower heads perfect for cooking and processing.",
      nutritionalInfo: "Rich in Vitamin C, K, and Fiber",
      harvestDate: "2024-03-11",
      shelfLife: "7-10 days",
      farmer: "Highland Produce",
      certifications: ["Natural", "Premium"],
      rating: 4.4,
      reviews: 93,
    },
    {
      id: 15,
      name: "Fresh Cucumbers",
      category: "vegetables",
      price: 35,
      unit: "per kg",
      minOrder: 100,
      maxOrder: 1500,
      image: "/images/vege1.png",
      origin: "Sindh Farms",
      inStock: true,
      description: "Crisp, fresh cucumbers perfect for salads and cooking.",
      nutritionalInfo: "High in Water Content and Vitamin K",
      harvestDate: "2024-03-13",
      shelfLife: "5-7 days",
      farmer: "Fresh Valley Co-op",
      certifications: ["Fresh", "Natural"],
      rating: 4.2,
      reviews: 67,
    },
    {
      id: 16,
      name: "Fresh Bell Peppers",
      category: "vegetables",
      price: 120,
      unit: "per kg",
      minOrder: 100,
      maxOrder: 1000,
      image: "/images/vege2.png",
      origin: "Balochistan",
      inStock: true,
      description:
        "Colorful, fresh bell peppers with sweet flavor and crisp texture.",
      nutritionalInfo: "Rich in Vitamin C and Antioxidants",
      harvestDate: "2024-03-12",
      shelfLife: "7-14 days",
      farmer: "Color Garden Farms",
      certifications: ["Premium", "Pesticide-Free"],
      rating: 4.6,
      reviews: 104,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "all" || product.category === selectedCategory;
    return categoryMatch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const getCategoryColor = (category) => {
    const colors = {
      vegetables: "bg-green-100 text-green-700 border-green-200",
      grains: "bg-amber-100 text-amber-700 border-amber-200",
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
        {/* Hero Section */}
        <section className="pt-24 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-green-200 mb-6">
                <span className="text-2xl mr-3">🥬</span>
                <span className="text-sm font-semibold text-green-700">
                  Farm Fresh Products
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Fresh from Farm
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                Premium quality agricultural products directly from verified
                farmers to your business
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-white/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-4 gap-8 text-center"
            >
              {[
                { number: "12+", label: "Fresh Products", icon: "🥕" },
                { number: "100kg", label: "Minimum Order", icon: "📦" },
                { number: "24h", label: "Fresh Guarantee", icon: "⏰" },
                { number: "100%", label: "Quality Assured", icon: "✅" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6"
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-white/70">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg scale-105"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(
                          product.category
                        )}`}
                      >
                        {
                          categories.find((cat) => cat.id === product.category)
                            ?.icon
                        }
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          product.inStock
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-red-100 text-red-700 border border-red-200"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.reviews})
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-green-600">
                          TK{product.price}
                        </span>
                        <span className="text-sm text-gray-500">
                          {product.unit}
                        </span>
                      </div>

                      <div className="text-xs text-gray-600">
                        <div>Min Order: {product.minOrder}kg</div>
                        <div>Origin: {product.origin}</div>
                        <div>Farmer: {product.farmer}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>

                    <button
                      disabled={!product.inStock}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        product.inStock
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {product.inStock ? "Add to Quote" : "Out of Stock"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Bulk Order Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Need Bulk Quantities?
              </h2>
              <p className="text-green-100 text-lg mb-8">
                Get special pricing for large orders. Contact our sales team for
                custom quotes and wholesale pricing.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-4xl mb-4">📞</div>
                  <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                  <p className="text-green-100">+92-xxx-xxx-xxxx</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-4xl mb-4">📧</div>
                  <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                  <p className="text-green-100">sales@krishibazaar.com</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-4xl mb-4">💬</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    WhatsApp
                  </h3>
                  <p className="text-green-100">+92-xxx-xxx-xxxx</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
                  Request Bulk Quote
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-green-600 transition-colors">
                  Download Price List
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductsPage; 