import { useForm } from "react-hook-form";
import { useUser } from "../hooks/UseUser";
import { useNavigate } from "react-router-dom";
export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { makeLoggin, error } = useUser();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await makeLoggin(data);
    if (user) navigate("/dashboard");
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 max-w-sm mx-auto card"
    >
      <h1 className="text-2xl text-center">Log in </h1>

      <div className="flex flex-col ">
        <label htmlFor="">Username:</label>
        <input
          type="text"
          className="block my-2 p-2.5 w-full rounded-md"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
          })}
        />
        {errors.username && (
          <span className="form-error">{errors.username?.message}</span>
        )}
      </div>

      <div className="flex flex-col ">
        <label htmlFor="">Password:</label>
        <input
          type="password"
          className="block my-2 p-2.5 w-full rounded-md"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: {
              value: 8,
              message: "Password must contains at least 8 characters",
            },
          })}
        />
        {errors.password && (
          <span className="form-error">{errors.password?.message}</span>
        )}
      </div>

      {error && <span className="form-error">{error}</span>}
      <button className="my-2 bg-blue-600 w-full text-[var(--secundary-color)]">
        Submit
      </button>
    </form>
  );
};
