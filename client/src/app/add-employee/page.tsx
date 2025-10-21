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

      console.log('Employee added:', data);

      alert('Employee added successfully!');
      router.push('/');
    } catch (err) {
      console.error('Error adding employee:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Employee</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Department</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="HR">HR</option>
          <option value="Product">Product</option>
        </select>

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Add Employee'}
          </button>

          <Link href="/" className="text-green-600 hover:underline">
            Cancel
          </Link>
        </div>

        {error && <p className="text-red-500">Error: {error.message}</p>}
      </form>
    </div>
  );
}
