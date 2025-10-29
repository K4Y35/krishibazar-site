"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBar";
import { useSiteContext } from "../../context/SiteContext";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";
import {
  FaShoppingCart,
  FaClock,
  FaCheck,
  FaTimes,
  FaBox,
  FaCheckCircle,
  FaCalendarAlt,
  FaTruck,
  FaDollarSign,
} from "react-icons/fa";

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated, user, loading: authLoading } = useSiteContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    fetchOrders();
  }, [isAuthenticated, authLoading, activeTab]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const queryParams = activeTab !== "all" ? `?order_status=${activeTab}` : "";
      const response = await fetch(
        `/api/proxy?path=${encodeURIComponent(`/user/orders${queryParams}`)}`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.success) {
        setOrders(data.data || []);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      processing: "bg-purple-100 text-purple-800",
      shipped: "bg-indigo-100 text-indigo-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      paid: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      refunded: "bg-orange-100 text-orange-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
            <p className="text-gray-600 mt-2">Track your product and supply orders</p>
          </div>

          {/* Order Summary */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <FaShoppingCart className="text-blue-600 text-2xl mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <FaClock className="text-yellow-600 text-2xl mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {orders.filter((o) => o.order_status === "pending").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <FaTruck className="text-purple-600 text-2xl mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Processing</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {orders.filter((o) => o.order_status === "processing" || o.order_status === "shipped").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <FaCheckCircle className="text-green-600 text-2xl mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {orders.filter((o) => o.order_status === "completed").length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Tabs */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {[
                  { key: "all", label: "All Orders" },
                  { key: "pending", label: "Pending" },
                  { key: "confirmed", label: "Confirmed" },
                  { key: "processing", label: "Processing" },
                  { key: "shipped", label: "Shipped" },
                  { key: "completed", label: "Completed" },
                  { key: "cancelled", label: "Cancelled" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.key
                        ? "border-green-500 text-green-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <FaShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No orders found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {activeTab === "all"
                      ? "You haven't placed any orders yet."
                      : `No ${activeTab} orders found.`}
                  </p>
                  {activeTab === "all" && (
                    <div className="mt-6">
                      <button
                        onClick={() => router.push("/products")}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        Browse Products & Supplies
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          {order.product_images && (
                            <img
                              src={`http://localhost:4000/public/${order.product_images.split(",")[0]}`}
                              alt={order.product_name}
                              className="h-20 w-20 object-cover rounded-lg"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          )}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {order.product_name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Order ID: #{order.id}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.category} • {order.product_type || "Product"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span
                            className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusColor(
                              order.order_status
                            )}`}
                          >
                            {order.order_status}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getPaymentStatusColor(
                              order.payment_status
                            )}`}
                          >
                            {order.payment_status}
                          </span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Quantity</p>
                          <p className="font-semibold">{order.order_quantity}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Unit Price</p>
                          <p className="font-semibold">৳{order.unit_price}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="font-semibold text-green-600 text-lg">
                            ৳{order.total_price.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Order Date</p>
                          <p className="font-semibold flex items-center">
                            <FaCalendarAlt className="mr-1 text-gray-400" />
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {order.delivery_address && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">
                            Delivery Address:
                          </p>
                          <p className="text-sm text-gray-800">
                            {order.delivery_address}
                          </p>
                        </div>
                      )}

                      {order.notes && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Notes:</strong> {order.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

