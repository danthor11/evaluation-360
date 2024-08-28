import { useEffect, useState } from "react";
import {
  getAllEvaluations,
  getEmployeeEvaluations,
  getEvaluationToRespose,
  getManagerEvaluations,
} from "../services/evaluations";

export const useEvaluations = ({
  id = "",
  employee_id = "",
  token = "",
  fetchAll = false,
}) => {
  const [evaluation, setEvaluation] = useState();
  const [evaluationsEmployee, setEvaluationsEmployee] = useState([]);
  const [managerEvaluations, setManagerEvaluations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getEvaluations = async () => {
      setIsLoading(true);
      const res = await getEvaluationToRespose(id);
      const evals = await res.json();
      setEvaluation(evals);
      setIsLoading(false);
    };

    if (id) {
      getEvaluations();
    }
  }, [id]);

  useEffect(() => {
    const getEvaluations = async () => {
      setIsLoading(true);
      const res = await getManagerEvaluations(token);
      const evals = await res.json();

      setManagerEvaluations(evals);
      setIsLoading(false);
    };

    if (token) {
      getEvaluations();
    }
  }, [token]);

  useEffect(() => {
    const getInfor = async () => {
      setIsLoading(true);
      const res = await getEmployeeEvaluations(employee_id);
      const data = await res.json();
      setEvaluationsEmployee(data);
      setIsLoading(false);
    };

    if (employee_id) {
      getInfor();
    }
  }, [employee_id]);

  useEffect(() => {
    const getEvaluation = async () => {
      setIsLoading(true);

      const res = await getAllEvaluations();
      const data = await res.json();
      console.log(data);
      setEvaluationsEmployee(data);
      setIsLoading(false);
    };

    if (fetchAll) {
      getEvaluation();
    }
  }, [fetchAll]);

  return {
    evaluation,
    evaluationsEmployee,
    managerEvaluations,
    isLoading,
  };
};
