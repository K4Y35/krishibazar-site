"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import NavBar from "../../components/NavBar";
import { useSiteContext } from "../../context/SiteContext";
import { toast } from "react-toastify";
import request from "../../services/httpServices";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaMoneyBillWave,
  FaPercentage,
  FaCalendarAlt,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaSeedling,
  FaHandHoldingUsd,
} from "react-icons/fa";

export default function InvestmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, user } = useSiteContext();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

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
      
      if (response.success && response.data) {
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
          <p className="text-gray-600 mt-2">Investment Opportunity Details</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Images */}
            {project.project_images && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800">Project Images</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.project_images.split(',').map((image, index) => (
                    <div key={index} className="relative h-64 overflow-hidden rounded-lg">
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

            {/* About Project */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <FaSeedling className="text-green-600 text-2xl mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">About This Project</h2>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                {project.why_fund_with_krishibazar || project.description}
              </p>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Project Duration</p>
                    <p className="font-semibold">{(project.duration_months || project.project_duration || project.duration)} months</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FaPercentage className="text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Expected Return</p>
                    <p className="font-semibold">{project.earning_percentage || project.expected_return_percent}% per unit</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Farmer Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <FaUser className="text-green-600 text-2xl mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">Farmer Information</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaUser className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Farmer Name</p>
                    <p className="font-semibold">{project.farmer_name}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaPhone className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Contact Number</p>
                    <p className="font-semibold">{project.farmer_phone}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold">{project.farmer_address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Terms */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <FaMoneyBillWave className="text-green-600 text-2xl mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">Investment Terms</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Per Unit Price</span>
                  <span className="text-xl font-bold">৳{project.per_unit_price?.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Total Returnable Per Unit</span>
                  <span className="text-xl font-bold text-green-600">৳{project.total_returnable_per_unit?.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Expected Return</span>
                  <span className="text-xl font-bold text-blue-600">{project.earning_percentage || project.expected_return_percent}%</span>
                </div>
                
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Project Duration</span>
                  <span className="text-xl font-bold">{(project.duration_months || project.project_duration || project.duration)} months</span>
                </div>

                <div className="flex justify-between items-center pb-3">
                  <span className="text-gray-600">Units Available</span>
                  <span className="text-xl font-bold text-purple-600">{project.total_units || project.available_units} units</span>
                </div>
              </div>
            </div>
          </div>

          {/* Investment CTA Sidebar */}
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
            <div className="text-center mb-6">
              <FaHandHoldingUsd className="text-green-600 text-5xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">Ready to Invest?</h3>
              <p className="text-gray-600 mt-2">Start your investment journey with us</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">Minimum Investment</span>
                <span className="font-semibold">৳{project.per_unit_price?.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Expected Return</span>
                <span className="font-semibold text-green-600">{project.earning_percentage}%</span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => router.push(`/investments/${project.id}/invest`)}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <FaMoneyBillWave className="mr-2" />
                Invest Now
              </button>
              
              <button
                onClick={() => router.back()}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Back to List
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <FaCheckCircle className="text-blue-600 mt-1 mr-2" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Secure Investment</p>
                  <p className="text-xs text-blue-700 mt-1">
                    All investments are backed by real agricultural projects and secured through our platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
