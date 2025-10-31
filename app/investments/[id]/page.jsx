"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NavBar from "../../components/NavBar";
import { useSiteContext } from "../../context/SiteContext";
import { toast } from "react-toastify";
import request from "../../services/httpServices";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaMoneyBillWave,
  FaPercentage,
  FaCalendarAlt,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaSeedling,
  FaHandHoldingUsd,
  FaChevronRight,
  FaImage,
  FaExclamationTriangle,
  FaCalculator,
} from "react-icons/fa";

export default function InvestmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, user, loading: authLoading } = useSiteContext();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [units, setUnits] = useState(1);

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

  const firstImage = useMemo(() => {
    if (!project?.project_images) return null;
    const parts = String(project.project_images)
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    return parts.length ? `http://localhost:4000/public/${parts[0]}` : null;
  }, [project]);

  const durationMonths = useMemo(
    () =>
      project?.duration_months ||
      project?.project_duration ||
      project?.duration,
    [project]
  );
  const expectedReturn = useMemo(
    () => project?.earning_percentage || project?.expected_return_percent,
    [project]
  );
  const perUnitPrice = useMemo(
    () => Number(project?.per_unit_price || 0),
    [project]
  );
  const totalReturnablePerUnit = useMemo(
    () => Number(project?.total_returnable_per_unit || 0),
    [project]
  );
  const unitsAvailable = useMemo(
    () => Number(project?.total_units || project?.available_units || 0),
    [project]
  );

  const clampedUnits = useMemo(() => {
    if (!units || units < 1) return 1;
    if (unitsAvailable && units > unitsAvailable) return unitsAvailable;
    return units;
  }, [units, unitsAvailable]);

  const totalInvestment = useMemo(
    () => clampedUnits * perUnitPrice,
    [clampedUnits, perUnitPrice]
  );
  const estimatedReturnTotal = useMemo(() => {
    if (!expectedReturn) return 0;
    return Math.round((totalInvestment * Number(expectedReturn)) / 100);
  }, [totalInvestment, expectedReturn]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="w-full">
          <div className="h-56 md:h-64 bg-gradient-to-r from-green-100 to-green-50" />
          <div className="container mx-auto px-6 lg:px-8 -mt-20 md:-mt-24">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="animate-pulse">
                <div className="h-7 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="h-4 bg-gray-100 rounded w-1/4 mb-6" />
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="h-64 bg-gray-100 rounded" />
                    <div className="h-40 bg-gray-100 rounded" />
                    <div className="h-44 bg-gray-100 rounded" />
                  </div>
                  <div className="h-80 bg-gray-100 rounded" />
                </div>
              </div>
            </div>
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

      {/* Hero */}
      <div className="relative h-56 md:h-64 lg:h-80 bg-gradient-to-r from-green-100 to-green-50">
        {firstImage ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${firstImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ) : null}
        <div className="relative z-10 h-full container mx-auto px-6 lg:px-8 flex flex-col justify-center">
          <div className="flex items-center text-white/90 text-sm md:text-base mb-3 md:mb-4">
            <button
              onClick={() => router.push("/investments")}
              className="hover:underline flex items-center gap-2"
            >
              Investments
            </button>
            <FaChevronRight className="mx-2" />
            <span className="line-clamp-1">{project.project_name}</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-sm">
            {project.project_name}
          </h1>
          <div className="mt-4 flex flex-wrap gap-3 md:gap-4">
            {durationMonths ? (
              <span className="inline-flex items-center bg-white/90 text-gray-800 text-xs md:text-sm px-3.5 py-1.5 rounded-full">
                <FaCalendarAlt className="text-green-600 mr-2" />
                {durationMonths} months
              </span>
            ) : null}
            {expectedReturn ? (
              <span className="inline-flex items-center bg-white/90 text-gray-800 text-xs md:text-sm px-3.5 py-1.5 rounded-full">
                <FaPercentage className="text-green-600 mr-2" />
                {expectedReturn}% expected
              </span>
            ) : null}
            {unitsAvailable ? (
              <span className="inline-flex items-center bg-white/90 text-gray-800 text-xs md:text-sm px-3.5 py-1.5 rounded-full">
                <FaHandHoldingUsd className="text-green-600 mr-2" />
                {unitsAvailable} units
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 -mt-12 md:-mt-16 pb-12 md:pb-16">
        {/* Back link card */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 bg-white rounded-full px-4 py-2 shadow-sm hover:shadow transition-shadow"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="bg-white rounded-lg shadow p-5 md:p-6">
                <p className="text-xs text-gray-500">Per Unit Price</p>
                <p className="text-lg font-semibold mt-1">
                  ৳{perUnitPrice?.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-5 md:p-6">
                <p className="text-xs text-gray-500">Returnable/Unit</p>
                <p className="text-lg font-semibold mt-1 text-green-600">
                  ৳{totalReturnablePerUnit?.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-5 md:p-6">
                <p className="text-xs text-gray-500">Expected Return</p>
                <p className="text-lg font-semibold mt-1 text-blue-600">
                  {expectedReturn}%
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-5 md:p-6">
                <p className="text-xs text-gray-500">Duration</p>
                <p className="text-lg font-semibold mt-1">
                  {durationMonths} months
                </p>
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="flex items-center mb-5">
                <FaImage className="text-green-600 text-2xl mr-3" />
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                  Project Gallery
                </h2>
              </div>
              {project.project_images ? (
                <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                  {String(project.project_images)
                    .split(",")
                    .map((image, index) => (
                      <div
                        key={index}
                        className="relative h-48 md:h-64 overflow-hidden rounded-lg group"
                      >
                        <img
                          src={`http://localhost:4000/public/${image.trim()}`}
                          alt={`${project.project_name} - Image ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex items-center p-4 bg-gray-50 text-gray-600 rounded">
                  <FaExclamationTriangle className="mr-2" /> No images available
                  for this project.
                </div>
              )}
            </div>

            {/* About Project */}
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="flex items-center mb-5">
                <FaSeedling className="text-green-600 text-2xl mr-3" />
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                  About This Project
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {project.why_fund_with_krishibazar || project.description}
              </p>
              <div className="mt-6 grid md:grid-cols-2 gap-5">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Project Duration</p>
                    <p className="font-semibold">{durationMonths} months</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaPercentage className="text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Expected Return</p>
                    <p className="font-semibold">{expectedReturn}% per unit</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Farmer Information */}
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="flex items-center mb-5">
                <FaUser className="text-green-600 text-2xl mr-3" />
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                  Farmer Information
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                <div className="bg-gray-50 rounded-lg p-5">
                  <p className="text-xs text-gray-500">Farmer Name</p>
                  <p className="font-semibold mt-1">{project.farmer_name}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-5">
                  <p className="text-xs text-gray-500">Contact Number</p>
                  <p className="font-semibold mt-1">{project.farmer_phone}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-5 md:col-span-1 col-span-2">
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-semibold mt-1">{project.farmer_address}</p>
                </div>
              </div>
            </div>

            {/* Investment Terms */}
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="flex items-center mb-5">
                <FaMoneyBillWave className="text-green-600 text-2xl mr-3" />
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                  Investment Terms
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="text-gray-600">Per Unit Price</span>
                  <span className="text-xl font-bold">
                    ৳{perUnitPrice?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="text-gray-600">
                    Total Returnable Per Unit
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    ৳{totalReturnablePerUnit?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="text-gray-600">Expected Return</span>
                  <span className="text-xl font-bold text-blue-600">
                    {expectedReturn}%
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="text-gray-600">Project Duration</span>
                  <span className="text-xl font-bold">
                    {durationMonths} months
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Units Available</span>
                  <span className="text-xl font-bold text-purple-600">
                    {unitsAvailable} units
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Investment CTA Sidebar */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-7 sticky top-8 h-max">
            <div className="text-center mb-6">
              <FaHandHoldingUsd className="text-green-600 text-5xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">
                Ready to Invest?
              </h3>
              <p className="text-gray-600 mt-2">
                Start your investment journey with us
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Per Unit Price</span>
                <span className="font-semibold">
                  ৳{perUnitPrice?.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Expected Return</span>
                <span className="font-semibold text-green-600">
                  {expectedReturn}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Units Available</span>
                <span className="font-semibold text-purple-600">
                  {unitsAvailable}
                </span>
              </div>
            </div>

            {/* Calculator */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FaCalculator className="text-green-600 mr-2" />
                <p className="font-medium">Investment Calculator</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Units</label>
                  <div className="mt-1 flex items-center">
                    <button
                      onClick={() =>
                        setUnits((v) => Math.max(1, (Number(v) || 1) - 1))
                      }
                      className="px-3 py-2 border border-gray-300 rounded-l-md hover:bg-gray-50"
                      aria-label="Decrease units"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={unitsAvailable || undefined}
                      value={clampedUnits}
                      onChange={(e) => setUnits(Number(e.target.value))}
                      className="w-full text-center border-y border-gray-300 p-2 focus:outline-none"
                    />
                    <button
                      onClick={() =>
                        setUnits((v) => {
                          const next = (Number(v) || 1) + 1;
                          return unitsAvailable
                            ? Math.min(unitsAvailable, next)
                            : next;
                        })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-r-md hover:bg-gray-50"
                      aria-label="Increase units"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Total Investment
                  </span>
                  <span className="font-semibold">
                    ৳{totalInvestment.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Estimated Return
                  </span>
                  <span className="font-semibold text-green-600">
                    ৳{estimatedReturnTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() =>
                  router.push(
                    `/investments/${project.id}/invest?units=${clampedUnits}`
                  )
                }
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
                  <p className="text-sm font-medium text-blue-900">
                    Secure Investment
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    All investments are backed by real agricultural projects and
                    secured through our platform.
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
