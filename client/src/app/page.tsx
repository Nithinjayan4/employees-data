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
    refetch(
      e.target.value ? { department: e.target.value } : {}
    );
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading employees.</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Directory</h1>
        <Link href="/add-employee">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            Add New Employee
          </button>
        </Link>
      </div>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Department:</label>
        <select
          className="border px-2 py-1 rounded"
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

      <table className="w-full border border-green-200 shadow-sm">
        <thead className=" text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Position</th>
            <th className="p-3">Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-t hover:bg-black-600">
              <td className="p-3">
                <Link
                  href={`/employee/${emp.id}`}
                  className="text-green-600 hover:underline"
                >
                  {emp.name}
                </Link>
              </td>
              <td className="p-3">{emp.position}</td>
              <td className="p-3">{emp.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
