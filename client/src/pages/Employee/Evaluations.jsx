import { useParams } from "react-router-dom";
import { useEvaluations } from "../../hooks/useEvaluations";
import EvaluationsList from "../../components/Evaluations/EvaluationList";
import { useEmployee } from "../../hooks/useEmployee";
import { Loading } from "../../components/common/Loading";

export const Evaluations = () => {
  const { id } = useParams();
  const { evaluationsEmployee, isLoading } = useEvaluations({
    employee_id: id,
  });
  const { employee, isLoading: emIsloading } = useEmployee({ employee_id: id });

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-4 gap-6">
        {emIsloading && <Loading />}
        {employee && (
          <div className="col-span-1 card h-fit">
            <div>
              <div className="text-2xl text-center mt-4 uppercase">
                {employee.first_name} {employee.last_name}
              </div>
              <div className="mx-auto mt-2 capitalize">
                {employee.job_title}
              </div>
            </div>
            <>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-medium text-muted-foreground">
                    Department
                  </div>
                  <div>{employee.department}</div>
                </div>
                <div>
                  <div className="font-medium text-muted-foreground">
                    Start date
                  </div>
                  <div className="flex items-center gap-2">
                    {new Date(employee.start_date).toLocaleDateString("es-ES")}
                  </div>
                </div>
              </div>
            </>
          </div>
        )}

        <div className="col-span-3 card">
          <div>
            <h1 className="text-2xl mb-2 font-semibold">Evaluation history:</h1>
          </div>
          <div className="overflow-auto">
            <EvaluationsList
              evaluations={evaluationsEmployee}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
