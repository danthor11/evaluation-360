import { useCallback, useEffect, useState } from "react";
import { loginService, registerService } from "../services/auth";
import { createEmployeeService } from "../services/employee";
import { getAllUser } from "../services/user";

import { useAuth } from "./useAuth";

export const useUser = () => {
  const { user, logOut, setUser } = useAuth();
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUser()
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  const makeLoggin = useCallback(async (data) => {
    try {
      const res = await loginService(data);
      const token = await res.json();
      if (!res.ok) {
        const errorMessage = token.message || res.statusText;
        throw new Error(errorMessage);
      }

      setUser(token);
      localStorage.setItem("token", JSON.stringify(token));

      return token;
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, []);

  const createUser = useCallback(
    async ({ username, password, email, role = "" }) => {
      try {
        const res = await registerService({
          role,
          username,
          password,
          email,
        });
        const user = await res.json();
        if (!res.ok) {
          const errorMessage = user.message || res.statusText;
          throw new Error(errorMessage);
        }
        const loginRes = await loginService({ username, password });
        const token = await loginRes.json();
        if (!loginRes.ok) {
          const errorMessage = token.message || loginRes.statusText;
          throw new Error(errorMessage);
        }
      } catch (error) {
        setError(error.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    },
    []
  );

  const createUserEmployee = useCallback(
    async ({
      first_name,
      last_name,
      department,
      job_title,
      start_date,
      username,
      password,
      email,
      role = "",
    }) => {
      try {
        const res = await registerService({
          role,
          username,
          password,
          email,
        });
        const user = await res.json();
        if (!res.ok) {
          const errorMessage = user.message || res.statusText;
          throw new Error(errorMessage);
        }

        const employeeRes = await createEmployeeService({
          first_name,
          last_name,
          department,
          job_title,
          user,
          start_date,
        });
        const employee = await employeeRes.json();
        if (!employeeRes.ok) {
          const errorMessage = employee.message || employeeRes.statusText;
          throw new Error(errorMessage);
        }

        if (!role || role === "Employee") {
          const loginRes = await loginService({ username, password });
          const token = await loginRes.json();
          if (!loginRes.ok) {
            const errorMessage = token.message || loginRes.statusText;
            throw new Error(errorMessage);
          }

          setUser(token);
          localStorage.setItem("token", JSON.stringify(token));
          return token;
        }
        return employee;
      } catch (error) {
        setError(error.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    },
    []
  );

  return {
    makeLoggin,
    createUser,
    createUserEmployee,
    logOut,
    error,
    users,
    user,
  };
};
