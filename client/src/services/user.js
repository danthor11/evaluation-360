import { SERVER_API_URL } from "../config";

export const getAllUser = () => {
  return fetch(`${SERVER_API_URL}/api/users`);
};

export const createUser = (data) => {
  return fetch(`${SERVER_API_URL}/api/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
