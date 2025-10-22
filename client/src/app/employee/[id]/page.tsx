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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading employee details...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 text-lg">Error: {error.message}</p>
      </div>
    );

  const employee = data?.getEmployeeDetails;

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Employee not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Employee Details
        </h1>

        <div className="space-y-5">
          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-gray-500 font-medium">Name</p>
            <p className="text-gray-900 font-semibold">{employee.name}</p>
          </div>

          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-gray-500 font-medium">Position</p>
            <p className="text-gray-900">{employee.position}</p>
          </div>

          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-gray-500 font-medium">Department</p>
            <p className="text-gray-900">{employee.department}</p>
          </div>

          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-gray-500 font-medium">Salary</p>
            <p className="text-green-700 font-semibold">
              ₹{employee.salary.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <Link
            href="/"
            className="text-green-700 hover:text-green-800 font-medium transition"
          >
            ← Back to Home
          </Link>

          <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition">
            Edit Employee
          </button>
        </div>
      </div>
    </div>
  );
}
