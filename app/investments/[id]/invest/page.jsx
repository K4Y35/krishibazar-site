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
  const { isAuthenticated, user } = useSiteContext();
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
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchProject();
  }, [params.id, isAuthenticated]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await request.get(`/proxy?path=${encodeURIComponent(`/api/projects/${params.id}`)}`);
      
      if (response.success) {
        setProject(response.data);
      } else {
        toast.error("Project not found");
        router.push("/investments");
      }
    } catch (error) {
      console.error("Error fetching project:", error);
      toast.error("Failed to fetch project details");
      router.push("/investments");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    try {
      setInvesting(true);
      const response = await request.post(`/proxy?path=${encodeURIComponent("/user/investments")}`, {
        project_id: project.id,
        units_invested: parseInt(formData.units),
        payment_method: formData.payment_method,
        payment_reference: formData.payment_reference,
        notes: formData.notes,
      });
      
      if (response.success) {
        toast.success("Investment request submitted successfully!");
        router.push("/profile/investor");
      } else {
        toast.error(response.message || "Failed to submit investment");
      }
    } catch (error) {
      console.error("Error creating investment:", error);
      toast.error("Failed to submit investment");
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
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Project Not Found</h2>
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
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Investments
          </button>
          <h1 className="text-3xl font-bold text-gray-800">{project.project_name}</h1>
          <p className="text-gray-600 mt-2">Investment Opportunity</p>
        </div>

        {/* Project Images */}
        {project.project_images && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Project Images</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.project_images.split(',').map((image, index) => (
                <div key={index} className="relative h-48 overflow-hidden rounded-lg">
                  <img 
                    src={`http://localhost:4000/public/${image}`}
                    alt={`${project.project_name} - Image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Project Details */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Project Details</h2>
            
            <div className="space-y-4">
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
                  <p className="text-gray-600">{project.project_duration} months</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaMoneyBillWave className="text-green-600 mr-3" />
                <div>
                  <p className="font-medium">Per Unit Price</p>
                  <p className="text-gray-600">৳{project.per_unit_price.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaPercentage className="text-green-600 mr-3" />
                <div>
                  <p className="font-medium">Expected Return</p>
                  <p className="text-gray-600">{project.earning_percentage}% per unit</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaCheckCircle className="text-green-600 mr-3" />
                <div>
                  <p className="font-medium">Total Returnable</p>
                  <p className="text-gray-600">৳{project.total_returnable_per_unit.toLocaleString()} per unit</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Project Description</h3>
              <p className="text-gray-600">{project.why_fund_with_krishibazar}</p>
            </div>
          </div>

          {/* Investment Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Make Investment</h2>
            
            <form onSubmit={handleInvest} className="space-y-4">
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
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Available: {project.available_units || project.total_units} units
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
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Investment Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Investment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Units:</span>
                    <span>{formData.units}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Per Unit:</span>
                    <span>৳{project.per_unit_price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
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
                disabled={investing}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {investing ? "Processing..." : "Submit Investment"}
              </button>
            </form>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
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
