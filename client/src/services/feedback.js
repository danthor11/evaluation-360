import { SERVER_API_URL } from "../config";

export const createFeedbackService = (data) => {
  return fetch(`${SERVER_API_URL}/api/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const getReport = ({ employee, id }) => {
  return fetch(`${SERVER_API_URL}/api/feedback/${employee}/${id}`);
};
