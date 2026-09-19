'use client';

import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold hover:text-blue-100">HJH Management System</Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">About HJH</h1>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-4">History</h2>
          <p className="text-gray-700 mb-4">
            Hera Jo Highway Self-Help Group is a community-based organization dedicated to improving the lives of its members through collaborative savings, credit, and support schemes.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Mission</h2>
          <p className="text-gray-700 mb-4">
            To provide accessible financial services and support mechanisms that enable members to achieve economic empowerment and social development.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Vision</h2>
          <p className="text-gray-700 mb-4">
            A thriving community where members have access to reliable savings, credit facilities, and mutual support systems that foster economic growth and social cohesion.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Values</h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Transparency in all operations</li>
            <li>Integrity in financial management</li>
            <li>Inclusivity and equal opportunity</li>
            <li>Mutual support and cooperation</li>
            <li>Accountability to members</li>
          </ul>
        </div>

        <Link href="/" className="text-blue-600 hover:underline mt-8">← Back to Home</Link>
      </div>
    </div>
  );
}
