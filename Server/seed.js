const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('employeeDirectory');

    // Collections
    const employeeCollection = db.collection('employees');
    const departmentCollection = db.collection('departments');

    // Clear old data
    await employeeCollection.deleteMany({});
    await departmentCollection.deleteMany({});

    // Seed departments
    const departments = [
      { name: 'Software Developer', floor: 2 },
      { name: 'Digital Marketing', floor: 3 },
      { name: 'HR', floor: 1 },
    ];

    const insertedDepts = await departmentCollection.insertMany(departments);

    // Seed employees
    const employees = [
      { name: 'JohnSmith', position: 'React Developer', department: 'Software Developer', salary: 85000 },
      { name: 'Lookman', position: 'Flutter Developer', department: 'Software Developer', salary: 80000 },
      { name: 'Sara Mathue', position: 'Wordpress Developer', department: 'Digital Marketing', salary: 45000 },
      { name: 'Manu Raj', position: 'HR Manager', department: 'HR', salary: 58000 },
      { name: 'Saliem', position: 'Technical Lead', department: 'Software Developer', salary: 75000 },
    ];

    await employeeCollection.insertMany(employees);

    console.log('✅ Seed data inserted successfully!');
  } catch (err) {
    console.error('❌ Error seeding data:', err.message);
  } finally {
    await client.close();
  }
}

seed();