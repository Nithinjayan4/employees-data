'use client';

import { useQuery } from '@apollo/client';
import { GET_EMPLOYEE_DETAILS } from '@/graphql/queries';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function EmployeeDetailPage() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <p className="p-4">Loading employee details...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const employee = data?.getEmployeeDetails;

  if (!employee) {
    return <p className="p-4 text-gray-500">Employee not found.</p>;
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>

      <div className="space-y-2 border rounded p-4 bg-gray-50">
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Salary:</strong> ₹{employee.salary}</p>
      </div>

      <Link href="/" className="inline-block mt-4 text-blue-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}