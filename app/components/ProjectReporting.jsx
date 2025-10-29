"use client";
import { useState, useEffect } from "react";
import request from "../services/httpServices";
import {
  FaNewspaper,
  FaChartLine,
  FaCheckCircle,
  FaMoneyBillWave,
  FaSeedling,
  FaCalendar,
  FaImages,
  FaVideo,
  FaEdit,
} from "react-icons/fa";

export default function ProjectReporting({ projectId, investmentId }) {
  const [updates, setUpdates] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("updates");

  useEffect(() => {
    if (projectId) {
      fetchReportingData();
    }
  }, [projectId, investmentId]);

  const fetchReportingData = async () => {
    try {
      setLoading(true);
      
      // Fetch updates if we have investment ID
      if (investmentId) {
        try {
          const updatesResponse = await request.get(
            `/proxy?path=${encodeURIComponent(`/user/investments/${investmentId}/updates`)}`
          );
          if (updatesResponse?.success) {
            setUpdates(updatesResponse.data || []);
          }
        } catch (err) {
          console.log("Could not fetch updates:", err);
        }

        // Fetch reports
        try {
          const reportsResponse = await request.get(
            `/proxy?path=${encodeURIComponent(`/user/investments/${investmentId}/reports`)}`
          );
          if (reportsResponse?.success) {
            setReports(reportsResponse.data || []);
          }
        } catch (err) {
          console.log("Could not fetch reports:", err);
        }
      }
    } catch (error) {
      console.error("Error fetching reporting data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUpdateTypeIcon = (type) => {
    switch (type) {
      case "progress":
        return <FaSeedling className="text-green-600" />;
      case "financial":
        return <FaMoneyBillWave className="text-blue-600" />;
      case "milestone":
        return <FaCheckCircle className="text-purple-600" />;
      case "harvest":
        return <FaChartLine className="text-orange-600" />;
      default:
        return <FaNewspaper className="text-gray-600" />;
    }
  };

  const parseJsonField = (field) => {
    if (typeof field === "string") {
      try {
        return JSON.parse(field);
      } catch {
        return null;
      }
    }
    return field;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab("updates")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "updates"
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <FaNewspaper className="inline mr-2" />
            Updates ({updates.length})
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "reports"
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <FaChartLine className="inline mr-2" />
            Reports ({reports.length})
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "updates" && (
          <div>
            {updates.length === 0 ? (
              <div className="text-center py-8">
                <FaNewspaper className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No updates yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Project updates will appear here as the farm progresses.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {updates.map((update) => {
                  const mediaFiles = parseJsonField(update.media_files);
                  const financialData = parseJsonField(update.financial_data);
                  const impactMetrics = parseJsonField(update.impact_metrics);

                  return (
                    <div
                      key={update.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getUpdateTypeIcon(update.update_type)}
                          <div>
                            <h3 className="text-lg font-semibold">{update.title}</h3>
                            <p className="text-sm text-gray-500 capitalize">
                              {update.update_type} update
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(update.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      {update.description && (
                        <p className="text-gray-700 mb-4">{update.description}</p>
                      )}

                      {mediaFiles && mediaFiles.length > 0 && (
                        <div className="mb-4">
                          <div className="flex space-x-2">
                            {mediaFiles.map((file, idx) => (
                              <img
                                key={idx}
                                src={file}
                                alt="Update media"
                                className="w-24 h-24 object-cover rounded"
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {financialData && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold mb-2">Financial Summary</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {financialData.expenses && (
                              <div>
                                <span className="text-gray-600">Expenses: </span>
                                <span className="font-semibold">
                                  ৳{financialData.expenses.toLocaleString()}
                                </span>
                              </div>
                            )}
                            {financialData.revenue && (
                              <div>
                                <span className="text-gray-600">Revenue: </span>
                                <span className="font-semibold text-green-600">
                                  ৳{financialData.revenue.toLocaleString()}
                                </span>
                              </div>
                            )}
                            {financialData.profit && (
                              <div>
                                <span className="text-gray-600">Profit: </span>
                                <span className="font-semibold text-green-600">
                                  ৳{financialData.profit.toLocaleString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {impactMetrics && Object.keys(impactMetrics).length > 0 && (
                        <div className="bg-blue-50 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold mb-2">Impact Metrics</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {impactMetrics.yield && (
                              <div>
                                <span className="text-gray-600">Yield: </span>
                                <span className="font-semibold">{impactMetrics.yield}</span>
                              </div>
                            )}
                            {impactMetrics.quality && (
                              <div>
                                <span className="text-gray-600">Quality: </span>
                                <span className="font-semibold">{impactMetrics.quality}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {update.milestone_status && (
                        <div className="bg-purple-50 rounded-lg p-3 mb-4">
                          <strong>Milestone: </strong>
                          {update.milestone_status}
                        </div>
                      )}

                      {update.farmer_notes && (
                        <div className="bg-green-50 rounded-lg p-3">
                          <strong>Farmer Notes: </strong>
                          {update.farmer_notes}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === "reports" && (
          <div>
            {reports.length === 0 ? (
              <div className="text-center py-8">
                <FaChartLine className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No reports yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Investment reports will appear here periodically.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map((report) => {
                  const financialSummary = parseJsonField(report.financial_summary);
                  const projectMetrics = parseJsonField(report.project_metrics);
                  const photos = parseJsonField(report.photos);
                  const videos = parseJsonField(report.videos);

                  return (
                    <div
                      key={report.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{report.report_period} Report</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(report.report_date).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                          {report.report_period}
                        </span>
                      </div>

                      {financialSummary && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold mb-2">Financial Summary</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {financialSummary.total_investment && (
                              <div>
                                <span className="text-gray-600">Total Investment: </span>
                                <span className="font-semibold">
                                  ৳{financialSummary.total_investment.toLocaleString()}
                                </span>
                              </div>
                            )}
                            {financialSummary.current_value && (
                              <div>
                                <span className="text-gray-600">Current Value: </span>
                                <span className="font-semibold text-green-600">
                                  ৳{financialSummary.current_value.toLocaleString()}
                                </span>
                              </div>
                            )}
                            {financialSummary.projected_return && (
                              <div>
                                <span className="text-gray-600">Projected Return: </span>
                                <span className="font-semibold text-green-600">
                                  ৳{financialSummary.projected_return.toLocaleString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {projectMetrics && Object.keys(projectMetrics).length > 0 && (
                        <div className="bg-blue-50 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold mb-2">Project Metrics</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {Object.entries(projectMetrics).map(([key, value]) => (
                              <div key={key}>
                                <span className="text-gray-600 capitalize">
                                  {key.replace(/_/g, " ")}:{" "}
                                </span>
                                <span className="font-semibold">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {photos && photos.length > 0 && (
                        <div className="mb-4">
                          <div className="flex space-x-2">
                            {photos.map((photo, idx) => (
                              <img
                                key={idx}
                                src={photo}
                                alt="Report photo"
                                className="w-24 h-24 object-cover rounded"
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {report.farmer_feedback && (
                        <div className="bg-green-50 rounded-lg p-3 mb-4">
                          <strong>Farmer Feedback:</strong>
                          <p className="mt-1 text-sm">{report.farmer_feedback}</p>
                        </div>
                      )}

                      {report.issues_challenges && (
                        <div className="bg-yellow-50 rounded-lg p-3 mb-4">
                          <strong>Issues & Challenges:</strong>
                          <p className="mt-1 text-sm">{report.issues_challenges}</p>
                        </div>
                      )}

                      {report.next_steps && (
                        <div className="bg-blue-50 rounded-lg p-3">
                          <strong>Next Steps:</strong>
                          <p className="mt-1 text-sm">{report.next_steps}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

