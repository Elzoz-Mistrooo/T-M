interface Project {
  id: number;
  name: string;
  managerId: number;  // ID of the manager who oversees the project
  employeeIds: number[];  // Array of employee IDs assigned to the project
  // Other project-related fields
}
