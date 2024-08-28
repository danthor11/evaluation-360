import { useState } from "react";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../common/Cards";
import { Loading } from "../common/Loading";
import { useForm } from "react-hook-form";
import { useFeedback } from "../../hooks/useFeedback";
import { Link } from "react-router-dom";

export default function EvaluationsList({ evaluations, isLoading }) {
  const [feedback, setFeedback] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createFeedback } = useFeedback({});
  if (isLoading) return <Loading />;
  console.log(evaluations, "list");
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Evaluation List</CardTitle>
        <CardDescription>
          Summary of all evaluations in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-y-auto h-[400px] pr-4">
          {evaluations?.map((evaluation) => (
            <div
              key={evaluation?._id}
              className="mb-4 grid grid-cols-[1fr_auto] items-start gap-4 pb-4 last:mb-0 last:pb-0 border-b last:border-none"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span
                    className={`flex h-2 w-2 rounded-full ${
                      evaluation.status === "Completed"
                        ? "bg-blue-500"
                        : "bg-sky-500"
                    }`}
                  />
                  <p className="text-sm font-medium">
                    {evaluation?.category.name}
                  </p>
                  <Badge
                    variant={
                      evaluation?.status === "Completed" ? "default" : "outline"
                    }
                  >
                    {evaluation?.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 capitalize">
                  {evaluation?.category.description}
                </p>
                <div className="flex items-center pt-2">
                  <div className="text-sm">
                    <p className="font-medium uppercase">
                      <Link to={`/employee/${evaluation?.employee._id}`}>
                        {evaluation?.employee.first_name +
                          " " +
                          evaluation?.employee.last_name}
                      </Link>
                    </p>
                    <p className="text-gray-600">Evaluate</p>
                    {/* <p className="text-gray-600">Feedbacks: {evaluation.feedback}</p> */}
                  </div>
                </div>
              </div>

              <Button
                variant={"outline"}
                onClick={() =>
                  setFeedback({
                    evaluation: evaluation._id,
                    author: evaluation?.employee._id,
                  })
                }
              >
                Feedback
              </Button>
            </div>
          ))}
        </div>
      </CardContent>

      {feedback && (
        <Card className={"border border-gray-300"}>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Feedback</CardTitle>

              <span
                className="text-right text-sm text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                onClick={() => {
                  setFeedback(null);
                }}
              >
                x
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(async (data) => {
                await createFeedback({
                  author: feedback.author,
                  comment: data.comment,
                  evaluation: feedback.evaluation,
                });
                reset();
                setFeedback(null);
              })}
            >
              <input
                type="text"
                placeholder="Write your feedback..."
                {...register("comment", {
                  required: "This comment is required",
                })}
              />
              {errors?.comment && (
                <span className="form-error">{errors.comment.message}</span>
              )}
              <div className="flex jus mt-2">
                <Button variant="outline">Send</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </Card>
  );
}
