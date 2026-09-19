'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">HJH Management System</div>
          <div className="hidden md:flex gap-8">
            <Link href="/" className="hover:text-blue-100">Home</Link>
            <Link href="/about" className="hover:text-blue-100">About</Link>
            <Link href="/governance" className="hover:text-blue-100">Governance</Link>
            <Link href="/programs" className="hover:text-blue-100">Programs</Link>
            <Link href="/auth/login" className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-blue-50">Login</Link>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            ☰
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-blue-700 px-4 py-2 flex flex-col gap-2">
            <Link href="/" className="hover:text-blue-100">Home</Link>
            <Link href="/about" className="hover:text-blue-100">About</Link>
            <Link href="/governance" className="hover:text-blue-100">Governance</Link>
            <Link href="/programs" className="hover:text-blue-100">Programs</Link>
            <Link href="/auth/login" className="bg-white text-blue-600 px-4 py-2 rounded font-semibold text-center">Login</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Hera Jo Highway Self-Help Group</h1>
          <p className="text-xl mb-8">Digital Platform for Member Management, Governance & Financial Services</p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/login" className="bg-white text-blue-600 px-8 py-3 rounded font-semibold hover:bg-blue-50">
              Member Login
            </Link>
            <Link href="/auth/register" className="bg-blue-500 text-white px-8 py-3 rounded font-semibold hover:bg-blue-400">
              Register
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Savings Management', desc: 'Manage your savings accounts and track your balance' },
              { title: 'Shares & Capital', desc: 'Purchase and manage shares in HJH' },
              { title: 'Loans & Credit', desc: 'Access loans and manage repayments' },
              { title: 'Last Respect Scheme', desc: 'Member protection and benefit coverage' },
              { title: 'Programs & Projects', desc: 'Participate in group initiatives' },
              { title: 'Governance', desc: 'Transparent management and decision-making' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2024 HJH Management System. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/contact" className="hover:text-blue-300">Contact</Link>
            <Link href="/privacy" className="hover:text-blue-300">Privacy</Link>
            <Link href="/terms" className="hover:text-blue-300">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
