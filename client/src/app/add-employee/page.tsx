'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EMPLOYEE } from '../../graphql/mutations';
import { GET_ALL_EMPLOYEES } from '../../graphql/queries';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddEmployeePage() {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    salary: '',
  });

  const [addEmployee, { loading, error }] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [{ query: GET_ALL_EMPLOYEES }],
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.position || !formData.department || !formData.salary) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const salary = parseInt(formData.salary);
      if (isNaN(salary)) {
        alert('Salary must be a valid number.');
        return;
      }

      const { data } = await addEmployee({
        variables: {
          name: formData.name,
          position: formData.position,
          department: formData.department,
          salary: salary,
        },
      });

      alert('Employee added successfully!');
      router.push('/');
    } catch (err) {
      console.error('Error adding employee:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg border border-gray-100">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Add New Employee
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter employee name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Position</label>
            <input
              type="text"
              name="position"
              placeholder="Enter position"
              value={formData.position}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none transition"
              required
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
              <option value="Product">Product</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Salary</label>
            <input
              type="number"
              name="salary"
              placeholder="Enter salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
          </div>

          <div className="flex justify-between items-center pt-5">
            <button
              type="submit"
              className={`px-5 py-2.5 rounded-lg text-white font-medium transition-all duration-200 shadow-sm ${
                loading
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 hover:shadow-md'
              }`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Add Employee'}
            </button>

            <Link
              href="/"
              className="text-green-700 hover:text-green-800 font-medium transition-colors duration-200"
            >
              Cancel
            </Link>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-3 bg-red-50 p-2 rounded-lg border border-red-200">
              Error: {error.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
