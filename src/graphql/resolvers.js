import validator from "validator";
import { Employee } from "../models/employee";
import { Project } from "../models/project";

export const resolvers = {
  Query: {
    employees: async () => {
      const employees = await Employee.find().populate("projects");
      console.log(employees);
      return employees;
    },
    projects: async () => {
      const projects = await Project.find().populate("lead");
      console.log(projects);
      return projects;
    }
  },
  Mutation: {
    createEmployee: async (_, { employeeInput }) => {
      // Validation Logic
      const errors = [];
      if (
        validator.isEmpty(employeeInput.name) ||
        !validator.isLength(employeeInput.name, { min: 1 })
      ) {
        errors.push({ message: "Name is invalid." });
      }
      if (!validator.isEmail(employeeInput.email)) {
        errors.push({ message: "Email is invalid." });
      }

      const existingEmployee = await Employee.findOne({
        email: employeeInput.email
      });
      if (existingEmployee) {
        const error = new Error("Email exists already!");
        throw error;
      }

      if (errors.length > 0) {
        const error = new Error("Invalid input.");
        error.data = errors;
        error.code = 422;
        throw error;
      }

      // Save and return Employee record
      const employee = new Employee({
        name: employeeInput.name,
        email: employeeInput.email,
        role: employeeInput.role
      });
      await employee.save();
      return employee;
    },
    createProject: async (_, { projectInput }) => {
      const employee = await Employee.findById(projectInput.lead);

      if (!employee) {
        const error = new Error("Invalid employee.");
        error.code = 401;
        throw error;
      }

      const project = new Project({
        title: projectInput.title,
        release: projectInput.release,
        lead: employee
      });
      const createdProject = await project.save();
      employee.projects.push(createdProject);
      await employee.save();
    }
  }
};
