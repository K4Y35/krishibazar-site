"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';

export default function InvestmentsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  const fetchProjects = async () => {
    try {
      let url = 'http://localhost:5090/api/projects?status=approved&limit=20';
      if (filter !== 'all') {
        url += `&type=${filter}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
    setLoading(false);
  };

  const calculateProgress = (project) => {
    return ((project.current_funded || 0) / project.total_fund_needed) * 100;
  };

  const formatCurrency = (amount) => {
    return `৳${amount.toLocaleString()}`;
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProjectIcon = (type) => {
    switch (type) {
      case 'cow': return '🐄';
      case 'goat': return '🐐';
      case 'chicken': return '🐔';
      case 'crop': return '🌾';
      default: return '🚜';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600">
        <NavBar />
      </div>

      {/* Header */}
      <div className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Investment Opportunities</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover Shariah-compliant agricultural projects and earn halal profits through real economic activities
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter('cow')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'cow' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            🐄 Cow Farming
          </button>
          <button
            onClick={() => setFilter('goat')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'goat' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            🐐 Goat Farming
          </button>
          <button
            onClick={() => setFilter('chicken')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'chicken' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            🐔 Chicken Farming
          </button>
          <button
            onClick={() => setFilter('crop')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'crop' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            🌾 Crop Farming
          </button>
        </div>

        {/* Islamic Finance Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Islamic Investment Principles</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600">🚫</span>
              <span>No Interest (Riba)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-600">🤝</span>
              <span>Profit & Loss Sharing</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-600">✅</span>
              <span>Real Economic Activity</span>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading investment opportunities...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Projects Found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later for new opportunities.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{getProjectIcon(project.project_type)}</span>
                      <div>
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                        <p className="text-sm text-gray-600">by {project.farmer_name}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(project.risk_level)}`}>
                      {project.risk_level} risk
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Funding Goal:</span>
                      <span className="font-semibold">{formatCurrency(project.total_fund_needed)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span>{project.duration_months} months</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Expected Returns:</span>
                      <span className="font-semibold text-green-600">{project.expected_return_percent}%</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Location:</span>
                      <span>{project.farmer_location}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Funding Progress</span>
                      <span>{calculateProgress(project).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(calculateProgress(project), 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1 text-gray-500">
                      <span>{formatCurrency(project.current_funded || 0)} raised</span>
                      <span>{formatCurrency(project.total_fund_needed - (project.current_funded || 0))} remaining</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Link
                      href={`/investments/${project.id}`}
                      className="flex-1 text-center bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/investments/${project.id}/invest`}
                      className="flex-1 text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                    >
                      Invest Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 py-12 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Investing?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our platform to support farmers through Islamic finance principles. 
            Your investments help real farmers while earning halal returns.
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