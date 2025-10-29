"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBar";
import { useSiteContext } from "../../context/SiteContext";
import { toast } from "react-toastify";
import request from "../../services/httpServices";
import ProjectReporting from "../../components/ProjectReporting";
import {
  FaEye,
  FaClock,
  FaCheck,
  FaTimes,
  FaMoneyBillWave,
  FaProjectDiagram,
  FaCalendarAlt,
  FaNewspaper,
  FaChartLine,
  FaImage,
  FaUser,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function InvestorProfilePage() {
  const router = useRouter();
  const { isAuthenticated, user, loading: authLoading } = useSiteContext();
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [expandedInvestments, setExpandedInvestments] = useState(new Set());

  useEffect(() => {
    // Wait for auth to finish loading before checking authentication
    if (authLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchInvestments();
  }, [isAuthenticated, authLoading, activeTab]);

  const fetchInvestments = async () => {
    try {
      setLoading(true);
      const queryParams = activeTab !== "all" ? `?status=${activeTab}` : "";
      const response = await request.get(
        `/proxy?path=${encodeURIComponent(`/user/investments${queryParams}`)}`
      );

      if (response.success) {
        setInvestments(response.data);
      } else {
        toast.error("Failed to fetch investments");
      }
    } catch (error) {
      console.error("Error fetching investments:", error);
      toast.error("Failed to fetch investments");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: FaClock },
      confirmed: { color: "bg-blue-100 text-blue-800", icon: FaCheck },
      cancelled: { color: "bg-red-100 text-red-800", icon: FaTimes },
      completed: { color: "bg-green-100 text-green-800", icon: FaCheck },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: FaClock },
      paid: { color: "bg-green-100 text-green-800", icon: FaCheck },
      failed: { color: "bg-red-100 text-red-800", icon: FaTimes },
      refunded: { color: "bg-gray-100 text-gray-800", icon: FaMoneyBillWave },
    };

    const config = statusConfig[paymentStatus] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        <Icon className="w-3 h-3 mr-1" />
        {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
      </span>
    );
  };

  const calculateTotalInvested = () => {
    return investments
      .filter((inv) => inv.status === "confirmed" || inv.status === "completed")
      .reduce((total, inv) => total + (inv.total_amount || 0), 0);
  };

  const calculateTotalReturns = () => {
    return investments
      .filter((inv) => inv.status === "completed")
      .reduce((total, inv) => total + (inv.return_received || 0), 0);
  };

  const calculateExpectedReturns = () => {
    return investments
      .filter((inv) => inv.status === "confirmed" || inv.status === "completed")
      .reduce((total, inv) => total + (inv.expected_return_amount || 0), 0);
  };

  const toggleInvestmentDetails = (investmentId) => {
    const newExpanded = new Set(expandedInvestments);
    if (newExpanded.has(investmentId)) {
      newExpanded.delete(investmentId);
    } else {
      newExpanded.add(investmentId);
    }
    setExpandedInvestments(newExpanded);
  };

  // Calculate project progress
  const getProjectProgress = (investment) => {
    if (!investment.project_status || !investment.project_duration) {
      return { progress: 0, elapsedMonths: 0 };
    }

    if (
      investment.project_status === "running" &&
      investment.project_started_at
    ) {
      const startDate = new Date(investment.project_started_at);
      const currentDate = new Date();
      const elapsedMonths = Math.floor(
        (currentDate - startDate) / (1000 * 60 * 60 * 24 * 30)
      );
      const progress = Math.min(
        (elapsedMonths / investment.project_duration) * 100,
        100
      );
      return { progress, elapsedMonths };
    }

    if (investment.project_status === "completed") {
      return { progress: 100, elapsedMonths: investment.project_duration };
    }

    return { progress: 0, elapsedMonths: 0 };
  };

  // Show loading while auth is initializing
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

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Investments</h1>
          <p className="text-gray-600 mt-2">Track your investment portfolio</p>
        </div>

        {/* Investment Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <FaMoneyBillWave className="text-blue-600 text-2xl mr-4" />
              <div>
                <p className="text-sm text-gray-600">Total Invested</p>
                <p className="text-2xl font-bold text-gray-800">
                  ৳{calculateTotalInvested().toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <FaCheck className="text-green-600 text-2xl mr-4" />
              <div>
                <p className="text-sm text-gray-600">Returns Received</p>
                <p className="text-2xl font-bold text-gray-800">
                  ৳{calculateTotalReturns().toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <FaProjectDiagram className="text-purple-600 text-2xl mr-4" />
              <div>
                <p className="text-sm text-gray-600">Expected Returns</p>
                <p className="text-2xl font-bold text-gray-800">
                  ৳{calculateExpectedReturns().toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Tabs */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: "all", label: "All Investments" },
                { key: "pending", label: "Pending" },
                { key: "confirmed", label: "Confirmed" },
                { key: "completed", label: "Completed" },
                { key: "cancelled", label: "Cancelled" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
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
            ) : investments.length === 0 ? (
              <div className="text-center py-8">
                <FaProjectDiagram className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No investments found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {activeTab === "all"
                    ? "You haven't made any investments yet."
                    : `No ${activeTab} investments found.`}
                </p>
                {activeTab === "all" && (
                  <div className="mt-6">
                    <button
                      onClick={() => router.push("/investments")}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      Browse Investment Opportunities
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {investments.map((investment) => (
                  <div
                    key={investment.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {investment.project_name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Farmer: {investment.farmer_name}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(investment.status)}
                        {getPaymentStatusBadge(investment.payment_status)}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          Investment Amount
                        </p>
                        <p className="font-semibold">
                          ৳{investment.total_amount?.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Units</p>
                        <p className="font-semibold">
                          {investment.units_invested}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Expected Return</p>
                        <p className="font-semibold text-green-600">
                          ৳{investment.expected_return_amount?.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-semibold">
                          {investment.project_duration} months
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar for Running Projects */}
                    {investment.project_status === "running" &&
                      (() => {
                        const { progress, elapsedMonths } =
                          getProjectProgress(investment);
                        return (
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm font-medium text-gray-700">
                                Project Progress
                              </p>
                              <p className="text-sm text-gray-600">
                                {elapsedMonths} of {investment.project_duration}{" "}
                                months
                              </p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {Math.round(progress)}% complete
                            </p>
                          </div>
                        );
                      })()}

                    {investment.project_status === "completed" && (
                      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm font-medium text-green-800">
                          ✓ Project Completed
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          This project has been completed successfully
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaCalendarAlt className="mr-2" />
                        Invested on{" "}
                        {new Date(
                          investment.investment_date
                        ).toLocaleDateString()}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleInvestmentDetails(investment.id)}
                          className="inline-flex items-center px-3 py-1 border border-blue-300 shadow-sm text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100"
                        >
                          {expandedInvestments.has(investment.id) ? (
                            <>
                              <FaChartLine className="mr-1" />
                              Hide Reports
                            </>
                          ) : (
                            <>
                              <FaNewspaper className="mr-1" />
                              View Reports
                            </>
                          )}
                        </button>
                        <button
                          onClick={() =>
                            router.push(
                              `/investments/${investment.project_id}/invest`
                            )
                          }
                          className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <FaEye className="mr-1" />
                          View Project
                        </button>
                      </div>
                    </div>

                    {investment.notes && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <strong>Notes:</strong> {investment.notes}
                        </p>
                      </div>
                    )}

                    {/* Expandable Project Reports Section */}
                    {expandedInvestments.has(investment.id) && (
                      <div className="mt-6 border-t border-gray-200 pt-6">
                        <div className="mb-4">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            Project Reports & Updates
                          </h4>
                          <p className="text-sm text-gray-600">
                            Stay updated with real-time progress from the farm
                          </p>
                        </div>
                        <ProjectReporting
                          projectId={investment.project_id}
                          investmentId={investment.id}
                        />
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
  );
}
