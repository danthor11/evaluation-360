export const EvaluationsPending = ({ evaluations }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">Evaluaciones Pendientes</h2>
      <p className="text-gray-500 mb-4">
        Responde a tus evaluaciones asignadas
      </p>
      <div className="space-y-4">
        {evaluations.map((evaluation) => (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{evaluation.category.name}</p>
              <p className="text-sm text-gray-500">
                Opened since: {evaluation.date}
              </p>
            </div>
            <button className="bg-blue-500 text-white rounded-lg px-4 py-2 flex items-center hover:bg-blue-600">
              Responder
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
