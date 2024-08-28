import { useEffect, useState } from "react";
import {
  getAllEmployeeService,
  getEmployeeService,
} from "../services/employee";

export const useEmployee = ({ employee_id = "", fetchAll = false }) => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const get = async () => {
      const res = await getAllEmployeeService();
      const employees = await res.json();
      setEmployees(employees);
    };

    get();
  }, [fetchAll]);

  useEffect(() => {
    const getEmployee = async () => {
      setisLoading(true);
      const res = await getEmployeeService(employee_id);
      const data = await res.json();
      setEmployee(data);
      setisLoading(false);
    };

    if (employee_id) {
      getEmployee();
    }
  }, [employee_id]);

  return {
    employees,
    employee,
    isLoading,
  };
};
