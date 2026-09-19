'use client';

import Link from 'next/link';

export default function Governance() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold hover:text-blue-100">HJH Management System</Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Governance Structure</h1>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">General Meeting</h3>
            <p className="text-gray-700">
              The highest decision-making body comprising all members. Meets annually to review performance and approve policies.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Management Committee</h3>
            <p className="text-gray-700">
              Elected representatives who provide oversight and strategic direction between General Meetings.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">CEO</h3>
            <p className="text-gray-700">
              Chief Executive Officer responsible for day-to-day operations and implementation of Committee decisions.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Audit & Risk Committee</h3>
            <p className="text-gray-700">
              Provides independent assurance on financial controls, risk management, and compliance.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Supervisory Committee</h3>
            <p className="text-gray-700">
              Ensures accountability and monitors adherence to approved policies and procedures.
            </p>
          </div>
        </div>

        <Link href="/" className="text-blue-600 hover:underline mt-8">← Back to Home</Link>
      </div>
    </div>
  );
}
