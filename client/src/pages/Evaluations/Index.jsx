import EvaluationsList from "../../components/Evaluations/EvaluationList";
import { useEvaluations } from "../../hooks/useEvaluations";

export const Index = () => {
  const { evaluationsEmployee, isLoading } = useEvaluations({ fetchAll: true });
  console.log(evaluationsEmployee);
  return (
    <div className="mb-4">
      <EvaluationsList
        evaluations={evaluationsEmployee}
        isLoading={isLoading}
      />
    </div>
  );
};
