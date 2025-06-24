"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const ProductDetail = () => {
  const params = useParams();
  const productId = params.id;
  const [quantity, setQuantity] = useState(100);

  // This would typically come from an API or database
  const product = {
    id: productId,
    name: "Fresh Tomatoes",
    category: "vegetables",
    price: 45,
    unit: "per kg",
    minOrder: 100,
    maxOrder: 5000,
    image: "/images/vege1.png",

    origin: "Punjab Farms",
    inStock: true,
    description: "Premium quality vine-ripened tomatoes, perfect for cooking and fresh consumption. These tomatoes are carefully selected from the best farms in Punjab and are known for their rich flavor, vibrant color, and nutritional value.",
    nutritionalInfo: "Rich in Vitamin C, Lycopene, and Potassium",
    harvestDate: "2024-03-10",
    shelfLife: "7-10 days",
    farmer: "Hassan Ali Farm",
    certifications: ["Organic", "Pesticide-Free"],
    rating: 4.8,
    reviews: 127,
    images: ["/images/vege1.png", "/images/vege2.png", "/images/vege3.png"],
    specifications: {
      "Variety": "Roma Tomatoes",
      "Size": "Medium to Large",
      "Color": "Deep Red",
      "Moisture": "92-94%",
      "pH Level": "4.2-4.9",
      "Storage": "Cool, dry place"
    },
    farmerDetails: {
      name: "Hassan Ali",
      experience: "15 years",
      farmSize: "50 acres",
      location: "District Sahiwal, Punjab",
      contact: "+92-xxx-xxx-xxxx"
    }
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Red Onions",
      price: 35,
      image: "/images/vege2.png",
      minOrder: 100
    },
    {
      id: 3,
      name: "Potato Premium",
      price: 30,
      image: "/images/vege3.png",
      minOrder: 200
    },
    {
      id: 4,
      name: "Fresh Garlic",
      price: 180,
      image: "/images/vege4.png",
      minOrder: 50
    }
  ];

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || product.minOrder;
    setQuantity(Math.max(value, product.minOrder));
  };

  const totalPrice = quantity * product.price;

  return (
    <>
      <NavBar />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
        {/* Product Detail Section */}
        <section className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              {/* Breadcrumb */}
              <div className="mb-8">
                <Link href="/products" className="text-green-600 hover:text-green-700 font-medium">
                  ← Back to Products
                </Link>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Product Images */}
                <div className="space-y-6">
                  <div className="relative h-96 rounded-2xl overflow-hidden bg-white shadow-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {product.images.map((img, index) => (
                      <div key={index} className="relative h-24 rounded-lg overflow-hidden bg-white shadow-md cursor-pointer hover:shadow-lg transition-shadow">
                        <Image
                          src={img}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        🥬 {product.category}
                      </span>
                      
                    </div>
                    
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
                    
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ⭐
                        </span>
                      ))}
                      <span className="text-gray-600 ml-2">({product.reviews} reviews)</span>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold text-green-600">₨{product.price}</span>
                      <span className="text-gray-500">{product.unit}</span>
                    </div>
                    
                    <div className="space-y-3 text-sm text-gray-600 mb-6">
                      <div className="flex justify-between">
                        <span>Minimum Order:</span>
                        <span className="font-semibold">{product.minOrder}kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maximum Order:</span>
                        <span className="font-semibold">{product.maxOrder}kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Origin:</span>
                        <span className="font-semibold">{product.origin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Harvest Date:</span>
                        <span className="font-semibold">{product.harvestDate}</span>
                      </div>
                    </div>

                    {/* Quantity Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Quantity (kg)
                      </label>
                      <input
                        type="number"
                        min={product.minOrder}
                        max={product.maxOrder}
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Minimum order: {product.minOrder}kg
                      </p>
                    </div>

                    {/* Total Price */}
                    <div className="bg-green-50 p-4 rounded-lg mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-800">Total Price:</span>
                        <span className="text-2xl font-bold text-green-600">₨{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        disabled={!product.inStock}
                        className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
                          product.inStock
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {product.inStock ? 'Add to Quote Request' : 'Out of Stock'}
                      </button>
                      
                      <button className="w-full py-4 border-2 border-green-600 text-green-600 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors">
                        Contact Farmer
                      </button>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-2">
                    {product.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
                      >
                        ✓ {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Details Tabs */}
              <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="grid md:grid-cols-3 gap-8 p-8">
                  {/* Specifications */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Product Specifications</h3>
                    <div className="space-y-3">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">{key}:</span>
                          <span className="font-semibold text-gray-800">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nutritional Info */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Nutritional Information</h3>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-green-700 leading-relaxed">{product.nutritionalInfo}</p>
                      <div className="mt-3 text-sm text-green-600">
                        <p>• Natural source of essential vitamins</p>
                        <p>• High antioxidant content</p>
                        <p>• Low in calories, high in nutrients</p>
                      </div>
                    </div>
                  </div>

                  {/* Farmer Details */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">About the Farmer</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl">👨‍🌾</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{product.farmerDetails.name}</p>
                          <p className="text-sm text-gray-600">{product.farmerDetails.experience} farming experience</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-semibold">Farm Size:</span> {product.farmerDetails.farmSize}</p>
                        <p><span className="font-semibold">Location:</span> {product.farmerDetails.location}</p>
                        <p><span className="font-semibold">Contact:</span> {product.farmerDetails.contact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Products */}
              <div className="mt-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Related Products</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedProducts.map((relatedProduct) => (
                    <Link
                      key={relatedProduct.id}
                      href={`/products/${relatedProduct.id}`}
                      className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-green-600">₨{relatedProduct.price}</span>
                          <span className="text-sm text-gray-500">Min: {relatedProduct.minOrder}kg</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default ProductDetail; 