"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSiteContext } from "../../context/SiteContext";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import {
  FaStar,
  FaUserFriends,
  FaShoppingCart,
  FaCheckCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderFormData, setOrderFormData] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    delivery_address: "",
    notes: "",
    payment_method: "cash_on_delivery",
  });
  const { isAuthenticated, user } = useSiteContext();

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  useEffect(() => {
    if (isAuthenticated && user) {
      setOrderFormData({
        customer_name: `${user.first_name || ""} ${
          user.last_name || ""
        }`.trim(),
        customer_phone: user.phone || "",
        customer_email: user.email || "",
        delivery_address: "",
        notes: "",
        payment_method: "cash_on_delivery",
      });
    }
  }, [isAuthenticated, user]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/products/${productId}`
      );
      const data = await response.json();
      if (data.success) {
        setProduct(data.data);
        setQuantity(data.data.min_order || 1);
        setOrderQuantity(data.data.min_order || 1);
      } else {
        toast.error("Product not found");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to place an order");
      return;
    }

    if (!product.in_stock) {
      toast.error("Product is currently out of stock");
      return;
    }

    if (orderQuantity < product.min_order) {
      toast.error(`Minimum order is ${product.min_order}`);
      return;
    }

    if (product.max_order && orderQuantity > product.max_order) {
      toast.error(`Maximum order is ${product.max_order}`);
      return;
    }

    if (product.quantity && orderQuantity > product.quantity) {
      toast.error(`Only ${product.quantity} units available`);
      return;
    }

    // Show order form
    setShowOrderForm(true);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (
      !orderFormData.customer_name ||
      !orderFormData.customer_phone ||
      !orderFormData.delivery_address
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const loadingToast = toast.loading("Placing your order...");

      const response = await fetch(
        `/api/proxy?path=${encodeURIComponent("/user/orders")}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            product_id: product.id,
            order_quantity: orderQuantity,
            unit_price: product.price,
            total_price: totalPrice,
            customer_name: orderFormData.customer_name,
            customer_phone: orderFormData.customer_phone,
            customer_email: orderFormData.customer_email,
            delivery_address: orderFormData.delivery_address,
            notes: orderFormData.notes,
            payment_method: orderFormData.payment_method,
          }),
        }
      );

      toast.dismiss(loadingToast);

      const data = await response.json();

      if (data.success) {
        toast.success("Order placed successfully! We will contact you soon.");
        setShowOrderForm(false);

        // Refresh product data to show updated stock
        await fetchProduct();
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Loading product details...</p>
          </div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <NavBar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800 mb-4">
              Product not found
            </p>
            <Link
              href="/products"
              className="text-green-600 hover:text-green-700"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </>
    );
  }

  const totalPrice = orderQuantity * product.price;

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
                <Link
                  href="/products"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  ← Back to Products
                </Link>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Product Images */}
                <div className="space-y-6">
                  <div className="relative h-96 rounded-2xl overflow-hidden bg-white shadow-lg">
                    {product.product_images ? (
                      <img
                        src={`http://localhost:4000/public/${
                          product.product_images.split(",")[0]
                        }`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <FaShoppingCart className="text-6xl text-gray-400" />
                      </div>
                    )}
                    {!product.in_stock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {product.product_images &&
                    product.product_images.split(",").length > 1 && (
                      <div className="grid grid-cols-3 gap-4">
                        {product.product_images
                          .split(",")
                          .slice(1, 4)
                          .map((img, index) => (
                            <div
                              key={index}
                              className="relative h-24 rounded-lg overflow-hidden bg-white shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                            >
                              <img
                                src={`http://localhost:4000/public/${img.trim()}`}
                                alt={`${product.name} ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                      </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        {product.type === "product" ? "🥬" : "🔧"}{" "}
                        {product.category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          product.type === "product"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {product.type === "product" ? "Product" : "Farm Supply"}
                      </span>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                      {product.name}
                    </h1>

                    {product.rating && (
                      <div className="flex items-center gap-2 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            <FaStar />
                          </span>
                        ))}
                        <span className="text-gray-600 ml-2">
                          ({product.reviews || 0} reviews)
                        </span>
                      </div>
                    )}

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {product.description ||
                        "Premium quality product directly from verified sources."}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold text-green-600">
                        ৳{product.price}
                      </span>
                      <span className="text-gray-500">{product.unit}</span>
                    </div>

                    <div className="space-y-3 text-sm text-gray-600 mb-6">
                      <div className="flex justify-between">
                        <span>Minimum Order:</span>
                        <span className="font-semibold">
                          {product.min_order} {product.unit}
                        </span>
                      </div>
                      {product.max_order && (
                        <div className="flex justify-between">
                          <span>Maximum Order:</span>
                          <span className="font-semibold">
                            {product.max_order} {product.unit}
                          </span>
                        </div>
                      )}
                      {product.quantity && (
                        <div className="flex justify-between">
                          <span>Available Quantity:</span>
                          <span className="font-semibold">
                            {product.quantity}
                          </span>
                        </div>
                      )}
                      {product.farmer && (
                        <div className="flex justify-between">
                          <span>Farmer:</span>
                          <span className="font-semibold">
                            {product.farmer}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Quantity Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min={product.min_order}
                        max={Math.min(
                          product.max_order || 10000,
                          product.quantity || 10000
                        )}
                        value={orderQuantity}
                        onChange={(e) => {
                          const value =
                            parseInt(e.target.value) || product.min_order;
                          const maxAvailable = product.quantity || 10000;
                          const maxAllowed = product.max_order
                            ? Math.min(product.max_order, maxAvailable)
                            : maxAvailable;
                          setOrderQuantity(
                            Math.min(
                              Math.max(value, product.min_order),
                              maxAllowed
                            )
                          );
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Minimum order: {product.min_order} {product.unit}
                        {product.quantity !== undefined && (
                          <span className="ml-2 text-green-600">
                            • {product.quantity} available
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Total Price */}
                    <div className="bg-green-50 p-4 rounded-lg mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-800">
                          Total Price:
                        </span>
                        <span className="text-2xl font-bold text-green-600">
                          ৳{totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={handleOrder}
                        disabled={!product.in_stock}
                        className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
                          product.in_stock
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {product.in_stock &&
                        product.quantity >= orderQuantity ? (
                          <span className="flex items-center justify-center gap-2">
                            <FaShoppingCart /> Place Order
                          </span>
                        ) : product.quantity < orderQuantity ? (
                          `Insufficient Stock (${product.quantity} available)`
                        ) : (
                          "Out of Stock"
                        )}
                      </button>

                      <Link href="/contact">
                        <button className="w-full py-4 border-2 border-green-600 text-green-600 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors">
                          Contact Sales
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Certifications */}
                  {product.certifications && (
                    <div className="flex flex-wrap gap-2">
                      {product.certifications.split(",").map((cert, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
                        >
                          <FaCheckCircle className="inline mr-1" />
                          {cert.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Product Details */}
              {(product.nutritional_info ||
                product.shelf_life ||
                product.farmer) && (
                <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-8 p-8">
                    {/* Nutritional Info */}
                    {product.nutritional_info && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                          Nutritional Information
                        </h3>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-green-700 leading-relaxed">
                            {product.nutritional_info}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Shelf Life */}
                    {product.shelf_life && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                          Storage Information
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">Shelf Life:</span>
                            <span className="font-semibold text-gray-800">
                              {product.shelf_life}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Farmer Details */}
                    {product.farmer && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                          Producer Details
                        </h3>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">
                              <FaUserFriends />
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {product.farmer}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />

      {/* Order Form Modal */}
      {showOrderForm && product && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Place Your Order</h2>

            {/* Order Summary */}
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">Product:</span> {product.name}
                </p>
                <p>
                  <span className="font-medium">Quantity:</span> {orderQuantity}
                </p>
                <p>
                  <span className="font-medium">Unit Price:</span> ৳
                  {product.price}
                </p>
                <p className="text-lg font-bold text-green-600">
                  <span className="font-semibold">Total:</span> ৳
                  {totalPrice.toLocaleString()}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={orderFormData.customer_name}
                  onChange={(e) =>
                    setOrderFormData({
                      ...orderFormData,
                      customer_name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={orderFormData.customer_phone}
                    onChange={(e) =>
                      setOrderFormData({
                        ...orderFormData,
                        customer_phone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={orderFormData.customer_email}
                    onChange={(e) =>
                      setOrderFormData({
                        ...orderFormData,
                        customer_email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Delivery Address *
                </label>
                <textarea
                  value={orderFormData.delivery_address}
                  onChange={(e) =>
                    setOrderFormData({
                      ...orderFormData,
                      delivery_address: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Enter your complete delivery address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Payment Method
                </label>
                <select
                  value={orderFormData.payment_method}
                  onChange={(e) =>
                    setOrderFormData({
                      ...orderFormData,
                      payment_method: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="cash_on_delivery">Cash on Delivery</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="mobile_banking">Mobile Banking</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={orderFormData.notes}
                  onChange={(e) =>
                    setOrderFormData({
                      ...orderFormData,
                      notes: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Any special instructions or notes..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  <span className="flex items-center justify-center gap-2">
                    <FaShoppingCart /> Place Order
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowOrderForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
