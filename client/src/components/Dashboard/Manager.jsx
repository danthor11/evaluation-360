import { Link } from "react-router-dom";
import EvaluationsList from "../Evaluations/EvaluationList";
import { Card, CardContent } from "../common/Cards";
import { useEvaluations } from "../../hooks/useEvaluations";
import { useAuth } from "../../hooks/useAuth";
import { Loading } from "../common/Loading";

export const ManagerDashboard = () => {
  const { user } = useAuth();
  const { managerEvaluations, isLoading } = useEvaluations({
    token: user.token,
  });
  return (
    <div className="container mx-auto py-5">
      <h1 className="text-3xl font-bold mb-6">Dashboard Manager</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="h-fit p-3">
          <CardContent>
            <Link
              to="/evaluations/create"
              className="bg-green-600 text-white w-fit rounded-lg p-3 transition-colors hover:bg-green-500"
            >
              Add Evaluation
            </Link>
          </CardContent>
        </Card>

        {managerEvaluations.length > 0 ? (
          <EvaluationsList evaluations={managerEvaluations} />
        ) : isLoading ? (
          <Loading />
        ) : (
          <h2>There arent evaluations created.</h2>
        )}
      </div>
    </div>
  );
};
