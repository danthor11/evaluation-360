import { useParams } from "react-router-dom";
import { ResponseForm } from "../../components/ResponseForm";

export const Response = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <ResponseForm evaluationId={id} />
    </div>
  );
};
