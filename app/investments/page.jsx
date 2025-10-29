"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import { useSiteContext } from "../context/SiteContext";
import request from "../services/httpServices";
import {
  FaSeedling,
  FaTractor,
  FaHandshake,
  FaCheckCircle,
  FaStar,
  FaSearch,
  FaBan,
  FaCheck,
} from "react-icons/fa";
import { GiCow, GiGoat, GiChicken } from "react-icons/gi";

export default function InvestmentsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [userInvestments, setUserInvestments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { isAuthenticated, user } = useSiteContext();

  useEffect(() => {
    fetchCategories();
    if (isAuthenticated) {
      fetchUserInvestments();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (categories.length > 0 || selectedCategory === "all") {
      fetchProjects();
    }
  }, [selectedCategory, categories]);

  const fetchUserInvestments = async () => {
    try {
      const response = await request.get(
        "/proxy?path=" + encodeURIComponent("/user/investments")
      );
      if (response.success) {
        setUserInvestments(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching user investments:", error);
    }
  };

  const hasUserInvested = (projectId) => {
    return userInvestments.some((inv) => inv.project_id === projectId);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/categories?is_active=true"
      );
      const data = await response.json();
      if (data.success) {
        setCategories(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      let url = "http://localhost:4000/api/projects?status=approved&limit=20";

      // If a category is selected (not "all"), find the category ID
      if (selectedCategory !== "all" && categories.length > 0) {
        const category = categories.find(
          (cat) => cat.name === selectedCategory
        );
        if (category) {
          url += `&category_id=${category.id}`;
        }
      }

      console.log("Fetching projects from:", url);

      const response = await fetch(url);
      const data = await response.json();

      console.log("Projects response:", data);

      if (data.success) {
        setProjects(data.data || []);
      } else {
        console.error("Error fetching projects:", data.message);
        setProjects([]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = (project) => {
    return ((project.current_funded || 0) / project.total_fund_needed) * 100;
  };

  const formatCurrency = (amount) => {
    return `৳${amount.toLocaleString()}`;
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category) => {
    if (!category) return <FaSeedling />;

    // If icon is a file (has extension), show image
    if (category.icon && category.icon.includes(".")) {
      return (
        <img
          src={`http://localhost:4000/public/${category.icon}`}
          alt={category.name}
          className="w-6 h-6"
        />
      );
    }

    // Otherwise, show default icons based on icon field
    switch (category.icon) {
      case "cow":
        return <GiCow />;
      case "goat":
        return <GiGoat />;
      case "chicken":
        return <GiChicken />;
      case "fish":
        return <FaFish />;
      case "crop":
      default:
        return <FaSeedling />;
    }
  };

  const getProjectIcon = (type) => {
    switch (type) {
      case "cow":
        return <GiCow />;
      case "goat":
        return <GiGoat />;
      case "chicken":
        return <GiChicken />;
      case "crop":
        return <FaSeedling />;
      default:
        return <FaTractor />;
    }
  };

  const allProjects = projects;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600">
        <NavBar />
      </div>

      {/* Header */}
      <div className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Investment Opportunities
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover Shariah-compliant agricultural projects and earn halal
              profits through real economic activities
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => {
              setFilter("all");
              setSelectedCategory("all");
            }}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            All Projects
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.name);
                setFilter("all");
              }}
              className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                selectedCategory === category.name
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span className="text-xl">{getCategoryIcon(category)}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Islamic Finance Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Islamic Investment Principles
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600">
                <FaBan />
              </span>
              <span>No Interest (Riba)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-600">
                <FaHandshake />
              </span>
              <span>Profit & Loss Sharing</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-600">
                <FaCheckCircle />
              </span>
              <span>Real Economic Activity</span>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              Loading investment opportunities...
            </p>
          </div>
        ) : allProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">
              <FaSearch />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Projects Found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or check back later for new
              opportunities.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.map((project) => {
              // Get first project image if available
              const projectImage = project.project_images
                ? project.project_images.split(",")[0]
                : null;
              console.log("projectImage", project);
              const imageUrl = projectImage
                ? `http://localhost:4000/public/${projectImage}`
                : null;

              return (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Project Image */}
                  {imageUrl && (
                    <div className="h-48 overflow-hidden bg-gray-100">
                      <img
                        src={imageUrl}
                        alt={project.project_name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">
                          {getProjectIcon(project.project_type)}
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold">
                            {project.title || project.project_name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            by {project.farmer_name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {hasUserInvested(project.id) && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800 flex items-center gap-1">
                            <FaCheck /> Already Booked
                          </span>
                        )}
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(
                            project.risk_level
                          )}`}
                        >
                          {project.risk_level} risk
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.description || project.why_fund_with_krishibazar}
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Per Unit Price:</span>
                        <span className="font-semibold">
                          {formatCurrency(
                            project.per_unit_price || project.total_fund_needed
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span>{project.duration_months} months</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Expected Returns:</span>
                        <span className="font-semibold text-green-600">
                          {project.earning_percentage ||
                            project.expected_return_percent}
                          %
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Location:</span>
                        <span>
                          {project.farmer_location || project.farmer_address}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Returnable:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(project.total_returnable_per_unit)}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Units Available:</span>
                        <span
                          className={`font-semibold ${
                            (project.available_units || 0) === 0
                              ? "text-red-600"
                              : "text-blue-600"
                          }`}
                        >
                          {project.available_units || 0} units
                        </span>
                      </div>
                    </div>

                    {/* Investment Info */}
                    <div className="mb-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="text-center">
                          <p className="text-sm text-green-700 font-medium">
                            Ready for Investment
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            This project is approved and ready for funding
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Link
                        href={`/investments/${project.id}`}
                        className="flex-1 text-center bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
                      >
                        View Details
                      </Link>
                      {(project.available_units || 0) > 0 ? (
                        <Link
                          href={`/investments/${project.id}/invest`}
                          className="flex-1 text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                        >
                          Invest Now
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="flex-1 text-center bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed"
                        >
                          Sold Out
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 py-12 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Investing?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our platform to support farmers through Islamic finance
            principles. Your investments help real farmers while earning halal
            returns.
          </p>
          <div className="flex space-x-4 justify-center">
            <Link
              href="/auth/register?role=investor"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Register as Investor
            </Link>
            <Link
              href="/about"
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 