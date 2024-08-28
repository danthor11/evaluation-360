import { useEffect, useState } from "react";
import { getReport } from "../services/feedback";
import { Badge } from "./common/Badge";

export const EmployeeReport = ({ employeeId }) => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvaluation = async () => {
      try {
        const data = await getReport({ employee: employeeId, id: "" });
        setEmployee(data);
      } catch (error) {
        setError("Failed to load employee evaluation.");
      }
    };

    loadEvaluation();
  }, [employeeId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold">Employee Report</h1>
        <h2 className="text-xl font-semibold mb-2">
          {employee.first_name} {employee.last_name}
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">
              {employee.evaluation.nombre}
            </h3>
            <p className="text-gray-500">{employee.evaluation.descripcion}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Responses:</h4>
            <ul className="list-disc pl-5 space-y-2">
              {employee.evaluation.respuestas.map((respuesta, index) => (
                <li key={index}>
                  <span className="font-medium">{respuesta.pregunta}</span>
                  <p className="text-gray-500">{respuesta.respuesta}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Feedbacks:</h4>
            <div className="space-y-2">
              {employee.evaluation.feedbacks.map((feedback, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                  <p className="mb-2">{feedback.comentario}</p>
                  <Badge variant="secondary">{feedback.autor}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
