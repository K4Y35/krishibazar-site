"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import NavBar from "../../../components/NavBar";
import { useSiteContext } from "../../../context/SiteContext";
import { toast } from "react-toastify";
import request from "../../../services/httpServices";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaMoneyBillWave,
  FaPercentage,
  FaCalendarAlt,
  FaUser,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function InvestmentPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, user, loading: authLoading } = useSiteContext();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [investing, setInvesting] = useState(false);
  const [formData, setFormData] = useState({
    units: 1,
    payment_method: "bank_transfer",
    payment_reference: "",
    notes: "",
  });

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchProject();
  }, [params.id, isAuthenticated, authLoading]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await request.get(
        `/proxy?path=${encodeURIComponent(`/api/projects/${params.id}`)}`
      );

      if (response.success) {
        setProject(response.data);
      } else {
        toast.error("Project not found");
        router.push("/investments");
      }
    } catch (error) {
      console.error("Error fetching project:", error);
      const apiMessage = error?.response?.data?.message;
      toast.error(apiMessage || "Failed to fetch project details");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    if (!project) return 0;
    return project.per_unit_price * formData.units;
  };

  const calculateExpectedReturn = () => {
    if (!project) return 0;
    return project.total_returnable_per_unit * formData.units;
  };

  const handleInvest = async (e) => {
    e.preventDefault();

    if (!formData.payment_reference.trim()) {
      toast.error("Payment reference is required");
      return;
    }

    // Prevent investing if project is not investable
    const hasStarted = !!project?.started_at;
    const hasCompleted = !!project?.completed_at;
    const isApproved = project?.status === "approved";
    const availableUnits =
      project?.available_units ?? project?.total_units ?? 0;
    const isInvestable =
      isApproved && !hasStarted && !hasCompleted && availableUnits > 0;
    if (!isInvestable) {
      toast.error(
        hasCompleted
          ? "This project has been completed and is not open for investment."
          : hasStarted
          ? "This project has already started and is not open for new investments."
          : availableUnits <= 0
          ? "This project is fully booked."
          : "This project is not open for investment."
      );
      return;
    }

    try {
      setInvesting(true);
      const response = await request.post(
        `/proxy?path=${encodeURIComponent("/user/investments")}`,
        {
          project_id: project.id,
          units_invested: parseInt(formData.units),
          payment_method: formData.payment_method,
          payment_reference: formData.payment_reference,
          notes: formData.notes,
        }
      );

      if (response.success) {
        toast.success("Investment request submitted successfully!");
        router.push("/profile/investor");
      } else {
        toast.error(response.message || "Failed to submit investment");
      }
    } catch (error) {
      console.error("Error creating investment:", error);
      const apiMessage = error?.response?.data?.message;
      toast.error(apiMessage || "Failed to submit investment");
    } finally {
      setInvesting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading project details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Project Not Found
            </h2>
            <button
              onClick={() => router.push("/investments")}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Back to Investments
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="container mx-auto px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 bg-white rounded-full px-4 py-2 shadow-sm hover:shadow transition-shadow mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Investments
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {project.project_name}
          </h1>
          <p className="text-gray-600 mt-2">Investment Opportunity</p>
        </div>

        {/* Project Images */}
        {project.project_images && (
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-5">
              Project Images
            </h2>
            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              {project.project_images.split(",").map((image, index) => (
                <div
                  key={index}
                  className="relative h-48 md:h-60 overflow-hidden rounded-lg"
                >
                  <img
                    src={`http://localhost:4000/public/${image}`}
                    alt={`${project.project_name} - Image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Project Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-5">
              Project Details
            </h2>

            <div className="space-y-5">
              <div className="flex items-center">
                <FaUser className="text-green-600 mr-3" />
                <div>
                  <p className="font-medium">Farmer</p>
                  <p className="text-gray-600">{project.farmer_name}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaMapMarkerAlt className="text-green-600 mr-3" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-gray-600">{project.farmer_address}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaCalendarAlt className="text-green-600 mr-3" />
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-gray-600">
                    {project.project_duration} months
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <FaMoneyBillWave className="text-green-600 mr-3" />
                <div>
                  <p className="font-medium">Per Unit Price</p>
                  <p className="text-gray-600">
                    ৳{project.per_unit_price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <FaPercentage className="text-green-600 mr-3" />
                <div>
                  <p className="font-medium">Expected Return</p>
                  <p className="text-gray-600">
                    {project.earning_percentage}% per unit
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <FaCheckCircle className="text-green-600 mr-3" />
                <div>
                  <p className="font-medium">Total Returnable</p>
                  <p className="text-gray-600">
                    ৳{project.total_returnable_per_unit.toLocaleString()} per
                    unit
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-3">Project Description</h3>
              <p className="text-gray-600">
                {project.why_fund_with_krishibazar}
              </p>
            </div>
          </div>

          {/* Investment Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-5">
              Make Investment
            </h2>

            {/* Non-investable notice */}
            {(() => {
              const hasStarted = !!project?.started_at;
              const hasCompleted = !!project?.completed_at;
              const isApproved = project?.status === "approved";
              const availableUnits =
                project?.available_units ?? project?.total_units ?? 0;
              const isInvestable =
                isApproved &&
                !hasStarted &&
                !hasCompleted &&
                availableUnits > 0;
              if (isInvestable) return null;
              return (
                <div className="mb-5 p-4 rounded-md border border-yellow-200 bg-yellow-50 text-yellow-800">
                  {hasCompleted
                    ? "This project has been completed and is not open for investment."
                    : hasStarted
                    ? "This project has already started and is not open for new investments."
                    : availableUnits <= 0
                    ? "This project is fully booked and cannot accept more investments."
                    : "This project is not open for investment at this time."}
                </div>
              );
            })()}

            <form onSubmit={handleInvest} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Units
                </label>
                <input
                  type="number"
                  name="units"
                  value={formData.units}
                  onChange={handleInputChange}
                  min="1"
                  max={project.total_units}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={
                    !!project?.started_at ||
                    !!project?.completed_at ||
                    (project?.available_units ?? project?.total_units ?? 0) <= 0
                  }
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Available: {project.available_units || project.total_units}{" "}
                  units
                </p>
                {project.available_units === 0 && (
                  <p className="text-sm text-red-600 mt-1 font-medium">
                    This project is fully booked
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="mobile_banking">Mobile Banking</option>
                  <option value="cash">Cash</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Reference/Transaction ID
                </label>
                <input
                  type="text"
                  name="payment_reference"
                  value={formData.payment_reference}
                  onChange={handleInputChange}
                  placeholder="Enter transaction ID or reference"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Any additional notes..."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Investment Summary */}
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-semibold mb-4">Investment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Units:</span>
                    <span>{formData.units}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Per Unit:</span>
                    <span>৳{project.per_unit_price.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold">
                    <span>Total Investment:</span>
                    <span>৳{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Expected Return:</span>
                    <span>৳{calculateExpectedReturn().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={
                  investing ||
                  !!project?.started_at ||
                  !!project?.completed_at ||
                  (project?.available_units ?? project?.total_units ?? 0) <= 0
                }
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {investing
                  ? "Processing..."
                  : !!project?.completed_at
                  ? "Project Completed"
                  : !!project?.started_at
                  ? "Project Started"
                  : (project?.available_units ?? project?.total_units ?? 0) <= 0
                  ? "Fully Booked"
                  : "Submit Investment"}
              </button>
            </form>

            <div className="mt-5 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <FaClock className="inline mr-1" />
                Your investment will be reviewed and confirmed within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
