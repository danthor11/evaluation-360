import { useEvaluations } from "../../hooks/useEvaluations";
import EvaluationsList from "../Evaluations/EvaluationList";

export const EmployeeDashboard = ({ employee_id }) => {
  const { evaluationsEmployee, isLoading } = useEvaluations({ employee_id });

  return (
    <div className="container mx-auto py-5">
      <h1 className="text-3xl font-bold mb-6">Dashboard Employee</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <EvaluationsList
          evaluations={evaluationsEmployee}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
