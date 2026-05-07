import { useState, useEffect, use } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/dashboard");
        setStats(data?.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard stats");
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  if (loading)
    return (
      <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>
    );

  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard Overview
      </h1>
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Leads Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">
            Total Leads
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats?.totalLeads || 0}
          </p>
        </div>
        {/* New Leads Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">
            New Leads
          </h3>
          <p className="text-3xl font-bold text-yellow-500">
            {stats?.newLeads || 0}
          </p>
        </div>
        {/* Won Leads Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">
            Deals Won
          </h3>
          <p className="text-3xl font-bold text-green-500">
            {stats?.wonLeads || 0}
          </p>
        </div>
        {/* Lost Leads Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">
            Deals Lost
          </h3>
          <p className="text-3xl font-bold text-red-500">
            {stats?.lostLeads || 0}
          </p>
        </div>
      </div>
      {/* Revenue Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Estimated Revenue Card */}
        <div className="bg-gradient-to-br from-gray-500 to-gray-900 p-6 rounded-xl shadow-md text-white">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">
            Total Estimated Value
          </h3>
          <p className="text-4xl font-bold">
            {formatCurrency(stats?.totalEstimatedValue || 0)}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Potential revenue from all active leads
          </p>
        </div>
        {/* Total Won Revenue Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-900 p-6 rounded-xl shadow-md text-white">
          <h3 className="text-blue-200 text-sm font-medium uppercase tracking-wider mb-2">
            Total Revenue (Won)
          </h3>
          <p className="text-4xl font-bold">
            {formatCurrency(stats?.totalWonValue || 0)}
          </p>
          <p className="text-sm text-blue-200 mt-2">
            Revenue generated from successfully closed deals
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
