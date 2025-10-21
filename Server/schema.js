const typeDefs = `#graphql
  type Employee {
    id: ID!
    name: String!
    position: String!
    department: String!
    salary: Int!
  }

  type Department {
    id: ID!
    name: String!
    floor: Int!
  }

  type Query {
    getAllEmployees: [Employee!]!
    getEmployeeDetails(id: ID!): Employee
    getEmployeesByDepartment(department: String!): [Employee!]!
  }

  type Mutation {
    addEmployee(name: String!, position: String!, department: String!, salary: Int!): Employee
  }
`;

module.exports = { typeDefs };