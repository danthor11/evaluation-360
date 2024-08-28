import { useForm } from "react-hook-form";
import { useEvaluations } from "../hooks/useEvaluations";

export const ResponseForm = ({ evaluationId }) => {
  const { evaluation } = useEvaluations({ id: evaluationId });
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  if (!evaluation)
    return (
      <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6"></div>
    );
  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="mb-6">
        <h1 className="text-xl  uppercase">
          Title evaluation:{" "}
          <span className="font-bold">{evaluation.category.name}</span>
        </h1>
        <p className="text-gray-600 capitalize">
          {evaluation.category.description}
        </p>
      </div>
      <form className="space-y-4" onSubmit={onSubmit}>
        {evaluation?.category.questions.map((question, index) => (
          <div key={question._id} className="space-y-4">
            {question.type === "Likert" && (
              <div className="space-y-1">
                <label className="block font-medium uppercase">
                  {index + 1}. {question.text}
                </label>
                <div className="flex space-x-4">
                  {[
                    "Totally disagree",
                    "Disagree",
                    "Neutral",
                    "Agree",
                    "Totally agree",
                  ].map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        className="h-4 w-4 text-blue-600 border-gray-300"
                        {...register(`question${index}.answer`)}
                      />
                      <label
                        htmlFor={`q${question._id}-${index}`}
                        className="text-gray-700"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {question.type === "Open" && (
              <div className="space-y-1">
                <label
                  htmlFor={`q${question._id}`}
                  className="block font-medium uppercase "
                >
                  {index + 1}. {question.text}
                </label>
                <textarea
                  id={`q${question._id}`}
                  {...register(`question${index}.answer`)}
                  className="w-full border-gray-300 rounded-md p-2 resize-none"
                  placeholder="Escribe tu respuesta aquí"
                ></textarea>
              </div>
            )}
            {question.type === "MultipleChoice" && (
              <div className="space-y-1">
                <label className="block font-medium uppercase">
                  {index + 1}. {question.text}
                </label>
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register(`question${index}.answer`)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`q${question._id}-${index}`}
                      className="text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Tipo de evaluación: </span>
          <span>Fecha evaluacion: {evaluation.date}</span>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          Enviar Evaluación
        </button>
      </form>
    </div>
  );
};
