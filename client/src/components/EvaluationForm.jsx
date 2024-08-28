import { useState } from "react";
import { useEmployee } from "../hooks/useEmployee";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const EvaluationForm = () => {
  const { employees } = useEmployee({ fetchAll: true });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    control,
    watch,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      evaluators: [{ id: "", role: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "evaluators",
  });

  const [questions, setQuestions] = useState([
    { name: "", type: "", answers: "" },
  ]);
  const [usedEvaluators, setUsedEvaluators] = useState([]);

  const addQuestion = () => {
    setQuestions([...questions, { name: "", type: "", answers: "" }]);
  };

  const removeQuestion = (index) => {
    if (questions.length <= 1) return;
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    resetField(`questions.${index}.name`);
    resetField(`questions.${index}.type`);
    resetField(`questions.${index}.options`);
    setQuestions(newQuestions);
  };

  const onSubmit = handleSubmit((data) => {
    fetch("http://localhost:3001/api/evaluations", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return navigate("/dashboard");
  });

  const isTheSame = watch("evaluators.id") === watch("employeeEvaluate");

  const addEvaluator = () => {
    append({ id: "", role: "" });
  };

  const removeEvaluator = (index) => {
    if (fields.length === 1) return;
    const removedEvaluator = fields[index].id;
    setUsedEvaluators(usedEvaluators.filter((id) => id !== removedEvaluator));
    remove(index);
  };

  const handleEvaluatorChange = (index, event) => {
    const selectedEvaluator = event.target.value;

    if (usedEvaluators.includes(selectedEvaluator)) {
      setError(`evaluators.${index}.id`, {
        type: "manual",
        message: "Este evaluador ya ha sido seleccionado.",
      });
    } else {
      clearErrors(`evaluators.${index}.id`);
      setUsedEvaluators([...usedEvaluators, selectedEvaluator]);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-1 max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow "
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">Create evaluation</h2>
        <p className="text-sm text-muted-foreground">
          Please complete the evaluation detail.
        </p>
      </div>

      <div className="space-y-1">
        <div className="space-y-1">
          <label htmlFor="category-name">Name category</label>
          <input
            id="category-name"
            placeholder="Ingrese el nombre de la categoría"
            {...register("category.name", { required: "Title is required" })}
          />
          {errors?.category?.name && (
            <p className="form-error">{errors.category.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label>Description category</label>
          <input
            placeholder="Ingrese la descripción de la categoría"
            {...register("category.description", {
              required: "Description is required",
            })}
          />
          {errors?.category?.description && (
            <p className="form-error">{errors.category.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-1">
          <div className="space-y-1 col-span-1">
            <label htmlFor="evaluation-date">Date evaluation</label>
            <input
              type="date"
              {...register("evaluationDate", { required: "Date is required" })}
            />
            {errors?.evaluationDate && (
              <p className="form-error">{errors.evaluationDate.message}</p>
            )}
          </div>

          <div className="space-y-1 col-span-1 ">
            <label htmlFor="employees">Employee to evaluate</label>
            <select className="" {...register("employeeEvaluate")}>
              <option value="">Select employee</option>
              {employees?.map((e) => (
                <option key={e._id} value={e._id} className="capitalize">
                  {e.first_name} {e.last_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label>Evaluator</label>
          {fields.map((item, index) => (
            <div key={item.id} className="flex space-x-2 items-center">
              <div className="flex-1">
                <select
                  {...register(`evaluators.${index}.id`, {
                    required: "Seleccione un evaluador",
                  })}
                  onChange={(e) => handleEvaluatorChange(index, e)}
                  className="flex-1"
                >
                  <option value="">Evaluador</option>
                  {employees.map((e) => (
                    <option key={e._id} value={e._id} className="capitalize">
                      {e.first_name + " " + e.last_name}
                    </option>
                  ))}
                </select>
                {errors?.evaluators?.[index].id && (
                  <p className="form-error">
                    {errors.evaluators?.[index].id.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <select
                  {...register(`evaluators.${index}.role`, {
                    required: "Seleccione un rol",
                  })}
                >
                  <option value="">Rol</option>
                  {isTheSame ? (
                    <option value="Self">self</option>
                  ) : (
                    <>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Colleague">Colleague</option>
                      <option value="Subordinate">Subordinate</option>
                    </>
                  )}
                </select>
                {errors?.evaluators?.[index].role && (
                  <p className="form-error">
                    {errors.evaluators?.[index].role.message}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={addEvaluator}
                className="flex-shrink-0"
              >
                +
              </button>

              <button
                type="button"
                onClick={() => removeEvaluator(index)}
                className="flex-shrink-0"
              >
                -
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-1">
          <label>Questions</label>
          {questions.map((question, index) => (
            <div key={index} className="space-y-1 p-2 border rounded-md">
              <select
                {...register(`questions.${index}.type`, {
                  required: "El tipo de pregunta es obligatorio",
                })}
              >
                <option value="">kind of question</option>
                <option value={"Likert"}>Likert</option>
                <option value={"Open"}>Open</option>
                <option value={"MultipleChoice"}>Multiple Choice</option>
              </select>
              {errors.questions?.[index]?.type && (
                <p className="form-error">
                  {errors.questions[index].type.message}
                </p>
              )}

              <input
                placeholder="Escriba su pregunta"
                type="text"
                {...register(`questions.${index}.name`, {
                  required: "Question is required",
                })}
              />

              {errors.questions?.[index]?.name && (
                <p className="form-error">
                  {errors.questions[index].name.message}
                </p>
              )}

              {watch(`questions.${index}.type`) === "MultipleChoice" && (
                <input
                  placeholder={"Responses (split by comas)"}
                  {...register(`questions.${index}.options`, {
                    validate: (value) => {
                      const type = watch(`questions.${index}.type`);
                      if (type === "MultipleChoice") {
                        const options = value
                          .split(",")
                          .map((option) => option.trim())
                          .filter((option) => option !== "");
                        if (options.length < 2) {
                          return "Debe haber al menos dos opciones separadas por comas";
                        }

                        const regex = /^[\w\s]+(,\s*[\w\s]+)+$/;
                        return (
                          regex.test(value) ||
                          "Ingrese valores separados por comas (sin coma al final y al menos dos opciones)"
                        );
                      }
                      return true;
                    },
                  })}
                />
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={questions.length <= 1}
                  onClick={() => removeQuestion(index)}
                  className="text-red-600 border border-red-600 p-1 text-sm disabled:text-red-800 w-full "
                >
                  Delete question
                </button>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="text-blue-600 border border-blue-600 p-1 w-full text-sm"
                >
                  New question
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[var(--primary-color)] text-white"
      >
        Create evaluation
      </button>
    </form>
  );
};
