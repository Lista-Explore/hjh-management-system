'use client';

import Link from 'next/link';

export default function Programs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold hover:text-blue-100">HJH Management System</Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">HJH Programs & Projects</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Savings Program</h3>
            <p className="text-gray-700">
              A structured savings program that helps members build financial reserves and develop savings discipline.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Kuku Project</h3>
            <p className="text-gray-700">
              A rotating savings and credit association that allows members to access lump sums for major investments.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Merry-Go-Round</h3>
            <p className="text-gray-700">
              A voluntary rotating fund where members take turns receiving financial benefits based on membership.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Table Banking</h3>
            <p className="text-gray-700">
              Small group lending scheme where members provide mutual credit support at agreed terms.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Last Respect Scheme</h3>
            <p className="text-gray-700">
              A mutual support fund that provides financial assistance during bereavement of members and their families.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Development Projects</h3>
            <p className="text-gray-700">
              Community-focused initiatives aimed at improving members' livelihoods and community infrastructure.
            </p>
          </div>
        </div>

        <Link href="/" className="text-blue-600 hover:underline mt-8">← Back to Home</Link>
      </div>
    </div>
  );
}
