export const EvaluationsComplete = ({ evaluations }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">Evaluaciones Completadas</h2>
      <p className="text-gray-500 mb-4">
        Revisa y da feedback a evaluaciones finalizadas
      </p>
      <div className="space-y-4">
        {evaluations.map((evaluation) => (
          <div
            className="flex items-center justify-between"
            key={evaluation._id}
          >
            <div>
              <p className="font-medium">{evaluation.category.name}</p>
              <p className="text-sm text-gray-800">{evaluation.employee}</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
            <button className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 flex items-center hover:bg-gray-200">
              FeedBack
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
