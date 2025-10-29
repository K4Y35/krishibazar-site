"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {
  FaShoppingCart,
  FaSeedling,
  FaBox,
  FaCheckCircle,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaCarrot,
} from "react-icons/fa";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:4000/api/products?type=product"
      );
      const data = await response.json();

      if (data.success) {
        setProducts(data.data?.products || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      id: "all",
      label: "All Products",
      icon: <FaShoppingCart />,
      color: "gray",
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
                <span className="text-2xl mr-3">
                  <FaSeedling />
                </span>
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
                { number: "12+", label: "Fresh Products", icon: <FaCarrot /> },
                { number: "100kg", label: "Minimum Order", icon: <FaBox /> },
                { number: "24h", label: "Fresh Guarantee", icon: <FaClock /> },
                {
                  number: "100%",
                  label: "Quality Assured",
                  icon: <FaCheckCircle />,
                },
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
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : (
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
                      {product.product_images ? (
                        <img
                          src={`http://localhost:4000/public/${
                            product.product_images.split(",")[0]
                          }`}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <FaBox className="text-4xl text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-white/80 rounded-full text-xs font-semibold border border-gray-200">
                          {product.category}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            product.in_stock
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : "bg-red-100 text-red-700 border border-red-200"
                          }`}
                        >
                          {product.in_stock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      {product.rating && (
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < Math.floor(product.rating || 0)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            >
                              <FaStar />
                            </span>
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            ({product.reviews || 0})
                          </span>
                        </div>
                      )}

                      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description || "Premium quality fresh product"}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-green-600">
                            ৳{product.price}
                          </span>
                          <span className="text-sm text-gray-500">
                            {product.unit}
                          </span>
                        </div>

                        <div className="text-xs text-gray-600">
                          <div>
                            Min Order: {product.min_order}
                            {product.unit}
                          </div>
                          {product.farmer && (
                            <div>Farmer: {product.farmer}</div>
                          )}
                        </div>
                      </div>

                      {product.certifications && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.certifications
                            .split(",")
                            .map((cert, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                              >
                                {cert.trim()}
                              </span>
                            ))}
                        </div>
                      )}

                      <Link href={`/products/${product.id}`}>
                        <button className="w-full py-3 rounded-lg font-semibold transition-colors bg-green-600 text-white hover:bg-green-700">
                          View Details & Order
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                <FaBox className="text-6xl mx-auto mb-4 text-gray-300" />
                <p className="text-xl">No products found</p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ProductsPage;
