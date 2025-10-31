"use client";
import { useState, useEffect } from "react";
import request from "../services/httpServices";
import apiUrls from "../config/apiUrls";
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
  const [error, setError] = useState("");

  const toMediaSrc = (path) => {
    if (!path) return "";
    const trimmed = String(path).trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `${apiUrls.base_url}/public/${trimmed}`;
  };

  useEffect(() => {
    if (!projectId || !investmentId) {
      setUpdates([]);
      setReports([]);
      setLoading(false);
      return;
    }
    fetchReportingData();
  }, [projectId, investmentId]);

  const fetchReportingData = async () => {
    try {
      setError("");
      setLoading(true);

      if (investmentId) {
        try {
          const updatesResponse = await request.get(
            `/proxy?path=${encodeURIComponent(
              `/user/investments/${investmentId}/updates`
            )}`
          );
          if (updatesResponse?.success) {
            setUpdates(updatesResponse.data || []);
          }
        } catch (err) {
          console.log("Could not fetch updates:", err);
        }

        try {
          const reportsResponse = await request.get(
            `/proxy?path=${encodeURIComponent(
              `/user/investments/${investmentId}/reports`
            )}`
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
      setError("Unable to load project reporting at the moment.");
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

  if (!investmentId) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <FaNewspaper className="text-2xl text-gray-400" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-gray-900">
            Reporting unavailable
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Link an investment to view updates and reports.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-green-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* Header + Tabs */}
      <div className="px-6 md:px-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              <FaNewspaper className="text-green-600" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                Project Reports & Updates
              </h3>
              <p className="text-sm text-gray-500">
                Real-time progress and investor reports
              </p>
            </div>
          </div>
        </div>
        {error && (
          <div className="mt-4 p-3 border border-red-200 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <div className="mt-5 border-b border-gray-200">
          <nav className="flex gap-6">
            <button
              onClick={() => setActiveTab("updates")}
              className={`relative py-3 text-sm font-medium transition-colors ${
                activeTab === "updates"
                  ? "text-green-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <FaNewspaper />
                Updates
                <span
                  className={`ml-2 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                    activeTab === "updates"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {updates.length}
                </span>
              </span>
              {activeTab === "updates" && (
                <span className="absolute left-0 -bottom-[1px] h-0.5 w-full bg-green-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`relative py-3 text-sm font-medium transition-colors ${
                activeTab === "reports"
                  ? "text-green-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <FaChartLine />
                Reports
                <span
                  className={`ml-2 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                    activeTab === "reports"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {reports.length}
                </span>
              </span>
              {activeTab === "reports" && (
                <span className="absolute left-0 -bottom-[1px] h-0.5 w-full bg-green-600" />
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {
          activeTab === "updates" && (
            <div>
              {updates.length === 0 ? (
                <div className="text-center py-10">
                  <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <FaNewspaper className="text-2xl text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-gray-900">
                    No updates yet
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Project updates will appear here as the farm progresses.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {updates.map((update) => {
                    const mediaFiles = parseJsonField(update.media_files);
                    const financialData = parseJsonField(update.financial_data);
                    const impactMetrics = parseJsonField(update.impact_metrics);

                    return (
                      <div
                        key={update.id}
                        className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white"
                      >
                        <div className="flex items-start justify-between mb-5">
                          <div className="flex items-center gap-3">
                            {getUpdateTypeIcon(update.update_type)}
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {update.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 capitalize border border-green-100">
                                  {update.update_type}
                                </span>
                                {update.milestone_status && (
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                                    {update.milestone_status}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-gray-500">
                              {new Date(update.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {update.description && (
                          <p className="text-gray-700 leading-relaxed mb-5">
                            {update.description}
                          </p>
                        )}

                        {mediaFiles && mediaFiles.length > 0 && (
                          <div className="mb-5">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {mediaFiles.map((file, idx) => (
                                <div
                                  key={idx}
                                  className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                                >
                                  <img
                                    src={toMediaSrc(file)}
                                    alt="Update media"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                      e.currentTarget.style.display = "none";
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {financialData && (
                          <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
                            <h4 className="font-semibold mb-3 text-gray-900">
                              Financial Summary
                            </h4>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              {financialData.expenses && (
                                <div>
                                  <span className="text-gray-600">
                                    Expenses:{" "}
                                  </span>
                                  <span className="font-semibold">
                                    ৳{financialData.expenses.toLocaleString()}
                                  </span>
                                </div>
                              )}
                              {financialData.revenue && (
                                <div>
                                  <span className="text-gray-600">
                                    Revenue:{" "}
                                  </span>
                                  <span className="font-semibold text-green-600">
                                    ৳{financialData.revenue.toLocaleString()}
                                  </span>
                                </div>
                              )}
                              {financialData.profit && (
                                <div>
                                  <span className="text-gray-600">
                                    Profit:{" "}
                                  </span>
                                  <span className="font-semibold text-green-600">
                                    ৳{financialData.profit.toLocaleString()}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {impactMetrics &&
                          Object.keys(impactMetrics).length > 0 && (
                            <div className="bg-blue-50 rounded-xl p-4 mb-5 border border-blue-100">
                              <h4 className="font-semibold mb-3 text-blue-900">
                                Impact Metrics
                              </h4>
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                {impactMetrics.yield && (
                                  <div>
                                    <span className="text-gray-600">
                                      Yield:{" "}
                                    </span>
                                    <span className="font-semibold">
                                      {impactMetrics.yield}
                                    </span>
                                  </div>
                                )}
                                {impactMetrics.quality && (
                                  <div>
                                    <span className="text-gray-600">
                                      Quality:{" "}
                                    </span>
                                    <span className="font-semibold">
                                      {impactMetrics.quality}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                        {update.milestone_status && (
                          <div className="bg-purple-50 rounded-lg p-3 mb-5 border border-purple-100">
                            <strong>Milestone: </strong>
                            {update.milestone_status}
                          </div>
                        )}

                        {update.farmer_notes && (
                          <div className="bg-green-50 rounded-lg p-3 border border-green-100">
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
          )
        }

        {
          activeTab === "reports" && (
            <div>
              {reports.length === 0 ? (
                <div className="text-center py-10">
                  <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <FaChartLine className="text-2xl text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-gray-900">
                    No reports yet
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Investment reports will appear here periodically.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {reports.map((report) => {
                    const financialSummary = parseJsonField(
                      report.financial_summary
                    );
                    const projectMetrics = parseJsonField(
                      report.project_metrics
                    );
                    const photos = parseJsonField(report.photos);
                    const videos = parseJsonField(report.videos);

                    return (
                      <div
                        key={report.id}
                        className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white"
                      >
                        <div className="flex items-start justify-between mb-5">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {report.report_period} Report
                            </h3>
                            <p className="text-sm text-gray-500">
                              {new Date(
                                report.report_date
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                            {report.report_period}
                          </span>
                        </div>

                        {financialSummary && (
                          <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
                            <h4 className="font-semibold mb-3 text-gray-900">
                              Financial Summary
                            </h4>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              {financialSummary.total_investment && (
                                <div>
                                  <span className="text-gray-600">
                                    Total Investment:{" "}
                                  </span>
                                  <span className="font-semibold">
                                    ৳
                                    {financialSummary.total_investment.toLocaleString()}
                                  </span>
                                </div>
                              )}
                              {financialSummary.current_value && (
                                <div>
                                  <span className="text-gray-600">
                                    Current Value:{" "}
                                  </span>
                                  <span className="font-semibold text-green-600">
                                    ৳
                                    {financialSummary.current_value.toLocaleString()}
                                  </span>
                                </div>
                              )}
                              {financialSummary.projected_return && (
                                <div>
                                  <span className="text-gray-600">
                                    Projected Return:{" "}
                                  </span>
                                  <span className="font-semibold text-green-600">
                                    ৳
                                    {financialSummary.projected_return.toLocaleString()}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {projectMetrics &&
                          Object.keys(projectMetrics).length > 0 && (
                            <div className="bg-blue-50 rounded-xl p-4 mb-5 border border-blue-100">
                              <h4 className="font-semibold mb-3 text-blue-900">
                                Project Metrics
                              </h4>
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                {Object.entries(projectMetrics).map(
                                  ([key, value]) => (
                                    <div key={key}>
                                      <span className="text-gray-600 capitalize">
                                        {key.replace(/_/g, " ")}:{" "}
                                      </span>
                                      <span className="font-semibold">
                                        {value}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        {photos && photos.length > 0 && (
                          <div className="mb-5">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {photos.map((photo, idx) => (
                                <div
                                  key={idx}
                                  className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                                >
                                  <img
                                    src={toMediaSrc(photo)}
                                    alt="Report photo"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                      e.currentTarget.style.display = "none";
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {report.farmer_feedback && (
                          <div className="bg-green-50 rounded-lg p-3 mb-5 border border-green-100">
                            <strong>Farmer Feedback:</strong>
                            <p className="mt-1 text-sm">
                              {report.farmer_feedback}
                            </p>
                          </div>
                        )}

                        {report.issues_challenges && (
                          <div className="bg-yellow-50 rounded-lg p-3 mb-5 border border-yellow-100">
                            <strong>Issues & Challenges:</strong>
                            <p className="mt-1 text-sm">
                              {report.issues_challenges}
                            </p>
                          </div>
                        )}

                        {report.next_steps && (
                          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
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
          )
        }
      </div>
    </div>
  );
}

