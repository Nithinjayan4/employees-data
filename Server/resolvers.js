const { ObjectId } = require('mongodb');
const { getDB } = require('./db');

const resolvers = {
  Query: {
    getAllEmployees: async () => {
      const db = getDB();
      return await db
        .collection('employees')
        .find({})
        .toArray();
    },
    getEmployeeDetails: async (_, { id }) => {
      const db = getDB();
      return await db.collection('employees').findOne({ _id: new ObjectId(id) });
    },
    getEmployeesByDepartment: async (_, { department }) => {
      const db = getDB();
      return await db.collection('employees').find({ department }).toArray();
    },
  },

  Mutation: {
    addEmployee: async (_, { name, position, department, salary }) => {
      const db = getDB();
      const newEmployee = { name, position, department, salary };
      const result = await db.collection('employees').insertOne(newEmployee);
      return { id: result.insertedId, ...newEmployee };
    },
  },

  Employee: {
    id: (employee) => employee._id?.toString(), // 👈 Maps _id to id for GraphQL
  }
};

module.exports = { resolvers };
