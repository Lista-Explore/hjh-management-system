'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function MemberDashboard() {
  const [user, setUser] = useState(null);
  const [savings, setSavings] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const userRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          { headers }
        );
        setUser(userRes.data);

        const savingsRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/savings`,
          { headers }
        );
        setSavings(savingsRes.data);

        const loansRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/loans`,
          { headers }
        );
        setLoans(loansRes.data);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
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
        <h1 className="text-2xl font-bold">HJH Member Portal</h1>
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

        {/* Welcome */}
        <div className="bg-white p-8 rounded-lg shadow mb-8">
          <h2 className="text-3xl font-bold">Welcome, {user?.first_name}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Savings */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Savings Account</h3>
            <div className="text-4xl font-bold text-blue-600 mb-4">
              ₦{savings?.balance?.toLocaleString() || '0'}
            </div>
            <Link href="/member/savings" className="text-blue-600 hover:underline">
              View Details →
            </Link>
          </div>

          {/* Shares */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Shares</h3>
            <div className="text-4xl font-bold text-green-600 mb-4">
              {savings?.shares || '0'}
            </div>
            <Link href="/member/shares" className="text-blue-600 hover:underline">
              View Details →
            </Link>
          </div>

          {/* Active Loans */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Active Loans</h3>
            <div className="text-4xl font-bold text-orange-600 mb-4">
              {loans.filter(l => l.status === 'active').length}
            </div>
            <Link href="/member/loans" className="text-blue-600 hover:underline">
              View Details →
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/member/savings" className="border p-4 rounded hover:bg-blue-50">
              💰 View Savings Transactions
            </Link>
            <Link href="/member/loans" className="border p-4 rounded hover:bg-blue-50">
              🏦 Manage Loans & Repayments
            </Link>
            <Link href="/member/shares" className="border p-4 rounded hover:bg-blue-50">
              📈 Shares Information
            </Link>
            <Link href="/member/statements" className="border p-4 rounded hover:bg-blue-50">
              📄 Download Statements
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
