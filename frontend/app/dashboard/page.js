'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ManagementDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [reports, setReports] = useState([]);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token || (user.role !== 'manager' && user.role !== 'admin')) {
      router.push('/auth/login');
      return;
    }

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const metricsRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/management/dashboard`,
          { headers }
        );
        setMetrics(metricsRes.data);

        const reportsRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/management/reports/financial`,
          { headers }
        );
        setReports(reportsRes.data);

        const actionsRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/management/actions`,
          { headers }
        );
        setActions(actionsRes.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">HJH Management Portal</h1>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/');
          }}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 font-semibold mb-2">Total Members</h3>
            <div className="text-4xl font-bold text-blue-600">
              {metrics?.totalMembers || 0}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 font-semibold mb-2">Total Savings</h3>
            <div className="text-4xl font-bold text-green-600">
              ₦{(metrics?.totalSavings || 0).toLocaleString()}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 font-semibold mb-2">Active Loans</h3>
            <div className="text-4xl font-bold text-orange-600">
              {metrics?.activeLoanCount || 0}
            </div>
          </div>
        </div>

        {/* Management Actions */}
        <div className="bg-white p-8 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-bold mb-6">Management Actions Register</h2>
          {actions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="p-4">Action</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Assigned To</th>
                    <th className="p-4">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {actions.map((action) => (
                    <tr key={action.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{action.action_title}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded text-white text-sm ${
                          action.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'
                        }`}>
                          {action.status}
                        </span>
                      </td>
                      <td className="p-4">{action.assigned_to}</td>
                      <td className="p-4">{new Date(action.due_date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No actions yet</p>
          )}
        </div>

        {/* Financial Reports */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Recent Financial Reports</h2>
          {reports.length > 0 ? (
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="border p-4 rounded hover:bg-gray-50">
                  <h3 className="font-bold">{report.title}</h3>
                  <p className="text-gray-600 text-sm">{new Date(report.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reports yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
