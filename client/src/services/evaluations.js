import { SERVER_API_URL } from "../config";

export const getEvaluationToRespose = (id) => {
  return fetch(`${SERVER_API_URL}/api/evaluations/${id}`);
};

export const getEmployeeEvaluations = (id) => {
  return fetch(`${SERVER_API_URL}/api/evaluations/employee/${id}`);
};

export const getManagerEvaluations = (token) => {
  return fetch(`${SERVER_API_URL}/api/evaluations/manager`, {
    headers: {
      authorization: token,
    },
  });
};

export const getAllEvaluations = () => {
  return fetch(`${SERVER_API_URL}/api/evaluations`);
};
