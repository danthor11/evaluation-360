import { SERVER_API_URL } from "../config";

export const loginService = (data) => {
  return fetch(`${SERVER_API_URL}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const registerService = (data) => {
  return fetch(`${SERVER_API_URL}/api/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
