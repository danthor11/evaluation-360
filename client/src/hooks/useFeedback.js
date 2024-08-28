import { useCallback, useEffect, useState } from "react";
import { createFeedbackService, getReport } from "../services/feedback";

export const useFeedback = ({ employee = "", id = "" }) => {
  console.log("DDDDDDDDDDD");

  const [reports, setReports] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("DDDDDDDDDDD");
    const getReportEmployee = async () => {
      setIsLoading(true);
      const res = await getReport({ employee, id });
      const data = await res.json();
      setReports(data);
      setIsLoading(false);
    };

    if (employee && id) {
      console.log("DDDDDDDDDDD");
      getReportEmployee();
    }
  }, [employee, id]);

  const createFeedback = useCallback(
    async ({ comment, author, evaluation }) => {
      const res = await createFeedbackService({ comment, author, evaluation });
      const feedback = await res.json();
      return feedback;
    },
    []
  );

  return {
    createFeedback,
    reports,
    isLoading,
  };
};
