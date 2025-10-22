'use client';

import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const GET_ALL_EMPLOYEES = gql`
  query {
    getAllEmployees {
      id
      name
      position
      department
    }
  }
`;

const GET_EMPLOYEES_BY_DEPARTMENT = gql`
  query GetEmployeesByDepartment($department: String!) {
    getEmployeesByDepartment(department: $department) {
      id
      name
      position
      department
    }
  }
`;

type Employee = {
  id: string;
  name: string;
  position: string;
  department: string;
};

export default function HomePage() {
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [queryToUse, setQueryToUse] = useState(GET_ALL_EMPLOYEES);
  const [variables, setVariables] = useState({});

  const { data, loading, error, refetch } = useQuery(queryToUse, {
    variables,
  });

  useEffect(() => {
    if (departmentFilter) {
      setQueryToUse(GET_EMPLOYEES_BY_DEPARTMENT);
      setVariables({ department: departmentFilter });
    } else {
      setQueryToUse(GET_ALL_EMPLOYEES);
      setVariables({});
    }
  }, [departmentFilter]);

  const employees: Employee[] =
    departmentFilter && data?.getEmployeesByDepartment
      ? data.getEmployeesByDepartment
      : data?.getAllEmployees || [];

  const departments = ['Engineering', 'Sales', 'HR'];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartmentFilter(e.target.value);
    refetch(e.target.value ? { department: e.target.value } : {});
  };

  if (loading) return <p className="p-8 text-center text-gray-500 text-lg">Loading employees...</p>;
  if (error) return <p className="p-8 text-center text-red-500 text-lg">Error loading employees.</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4 sm:mb-0">
            Employee Directory
          </h1>
          <Link href="/add-employee">
            <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-all">
              + Add New Employee
            </button>
          </Link>
        </div>

        <div className="mb-6 flex items-center space-x-3">
          <label className="text-gray-700 font-medium">Filter by Department:</label>
          <select
            className="border border-gray-300 bg-gray-100 text-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={departmentFilter}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full border-collapse">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 text-left font-semibold">Name</th>
                <th className="p-3 text-left font-semibold">Position</th>
                <th className="p-3 text-left font-semibold">Department</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr
                  key={emp.id}
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-green-50 transition`}
                >
                  <td className="p-3 text-gray-800 font-medium">
                    <Link
                      href={`/employee/${emp.id}`}
                      className="text-green-700 hover:underline"
                    >
                      {emp.name}
                    </Link>
                  </td>
                  <td className="p-3 text-gray-700">{emp.position}</td>
                  <td className="p-3 text-gray-700">{emp.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {employees.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No employees found.</p>
        )}
      </div>
    </div>
  );
}
