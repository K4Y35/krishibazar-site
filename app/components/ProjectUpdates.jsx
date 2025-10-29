"use client";
import { useState, useEffect } from "react";
import { FaNewspaper, FaCheckCircle, FaClock, FaSeedling, FaChartLine } from "react-icons/fa";

export default function ProjectUpdates({ projectId }) {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedUpdate, setExpandedUpdate] = useState(null);

  useEffect(() => {
    if (projectId) {
      fetchUpdates();
    }
  }, [projectId]);

  const fetchUpdates = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/proxy?path=${encodeURIComponent(`/user/investments/${projectId}/updates`)}`
      );
      const data = await response.json();
      
      if (data.success) {
        setUpdates(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching updates:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUpdateIcon = (type) => {
    switch (type) {
      case "milestone":
        return FaCheckCircle;
      case "harvest":
        return FaSeedling;
      case "financial":
        return FaChartLine;
      case "progress":
        return FaClock;
      default:
        return FaNewspaper;
    }
  };

  const getUpdateColor = (type) => {
    switch (type) {
      case "milestone":
        return "bg-green-100 text-green-800";
      case "harvest":
        return "bg-yellow-100 text-yellow-800";
      case "financial":
        return "bg-blue-100 text-blue-800";
      case "progress":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (updates.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <FaNewspaper className="mx-auto text-4xl mb-2" />
        <p>No updates posted yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {updates.map((update) => {
        const Icon = getUpdateIcon(update.update_type);
        const isExpanded = expandedUpdate === update.id;
        
        return (
          <div
            key={update.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => setExpandedUpdate(isExpanded ? null : update.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${getUpdateColor(update.update_type)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{update.title}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(update.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUpdateColor(update.update_type)}`}>
                {update.update_type}
              </span>
            </div>

            {isExpanded && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                {update.description && (
                  <p className="text-gray-700 mb-3">{update.description}</p>
                )}
                
                {update.milestone_status && (
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-700">Status: </span>
                    <span className="text-sm text-green-600">{update.milestone_status}</span>
                  </div>
                )}
                
                {update.farmer_notes && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <p className="text-sm font-medium text-green-800 mb-1">
                      Farmer Notes:
                    </p>
                    <p className="text-sm text-green-700">{update.farmer_notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

