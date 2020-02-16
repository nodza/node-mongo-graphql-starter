import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    email: String!
    role: String!
    projects: [Project]
  }

  input EmployeeInput {
    name: String!
    email: String!
    role: String!
    projects: [ProjectInput]
  }

  type Project {
    id: ID!
    title: String!
    release: String!
    lead: Employee
  }

  input ProjectInput {
    title: String!
    release: String!
    lead: ID!
  }

  type Query {
    employees: [Employee]
    employee(id: ID!): Employee!
    projects: [Project]
    project(id: ID!): Project!
  }

  type Mutation {
    createEmployee(employeeInput: EmployeeInput): Employee!
    createProject(projectInput: ProjectInput): Project!
  }
`;
