import { useForm } from "react-hook-form";
import { useUser } from "../hooks/UseUser";

export const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { createUserEmployee, error } = useUser();

  const onSubmit = handleSubmit(async (data) => {
    const user = await createUserEmployee(data);
    if (user) {
      reset();
    }
  });

  return (
    <form
      className="bg-white shadow-md rounded-lg p-6 h-fit"
      onSubmit={onSubmit}
    >
      <h2 className="text-xl font-semibold mb-2">Create New User</h2>
      <p className="text-gray-500 mb-4">
        Add new administrators or managers to the system
      </p>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-x-1">
          <div className="flex flex-col ">
            <label htmlFor="">First name:</label>
            <input
              type="text"
              {...register("first_name", {
                required: {
                  value: true,
                  message: "First name is required",
                },
              })}
            />
            {errors.first_name && (
              <span className="form-error">{errors.first_name?.message}</span>
            )}
          </div>
          <div className="flex flex-col ">
            <label htmlFor="">Last name:</label>
            <input
              type="text"
              {...register("last_name", {
                required: {
                  value: true,
                  message: "Last name is required",
                },
              })}
            />
            {errors.last_name && (
              <span className="form-error">{errors.last_name?.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="">Department:</label>
          <input
            type="text"
            {...register("department", {
              required: {
                value: true,
                message: "Department is required",
              },
            })}
          />
          {errors.department && (
            <span className="form-error">{errors.department?.message}</span>
          )}
        </div>
        <div className="flex flex-col ">
          <label htmlFor="">Job title:</label>
          <input
            type="text"
            {...register("job_title", {
              required: {
                value: true,
                message: "Job title is required",
              },
            })}
          />
          {errors.job_title && (
            <span className="form-error">{errors.job_title?.message}</span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-1">
          <div className="flex flex-col ">
            <label htmlFor="">Username:</label>
            <input
              type="text"
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
            <label htmlFor="">Email:</label>
            <input
              type="text"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
                  message: "Email is not valid",
                },
              })}
            />
            {errors.email && (
              <span className="form-error">{errors.email?.message}</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-1">
          <div className="flex flex-col ">
            <label htmlFor="">Employee entry date:</label>
            <input
              type="date"
              {...register("start_date", {
                required: {
                  value: true,
                  message: "Employee entry date is required",
                },
              })}
            />
            {errors.start_date && (
              <span className="form-error">{errors.start_date?.message}</span>
            )}
          </div>

          <div className="flex flex-col ">
            <label htmlFor="">Password:</label>

            <input
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  message: "Password must contains at least 8 characters",
                  value: 8,
                },
              })}
            />
            {errors.password && (
              <span className="form-error">{errors.password?.message}</span>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            {...register("role", {
              required: {
                value: true,
                message: "Role is required",
              },
            })}
            className="block w-full border border-gray-300 rounded-lg p-2.5"
          >
            <option value="" disabled>
              Select a role
            </option>
            <option value="Admin">Administrator</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        {error && <span className="form-error">{error}</span>}

        <button className="w-full flex items-center justify-center bg-blue-500 text-white rounded-lg p-2.5 hover:bg-blue-600">
          Create User
        </button>
      </div>
    </form>
  );
};
