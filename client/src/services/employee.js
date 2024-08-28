import { SERVER_API_URL } from "../config";

export const createEmployeeService = (data) => {
  return fetch(`${SERVER_API_URL}/api/employees`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAllEmployeeService = () => {
  return fetch(`${SERVER_API_URL}/api/employees`);
};

export const getEmployeeService = (id) => {
  return fetch(`${SERVER_API_URL}/api/employees/${id}`);
};
