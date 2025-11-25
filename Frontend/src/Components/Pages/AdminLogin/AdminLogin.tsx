import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type AdminLoginForm = {
  email: string;
  password: string;
};

const AdminLogin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginForm>();

  const onSubmit = async (data: AdminLoginForm) => {
    try {
      const res = await axios.post("http://localhost:3000/admin/login", data);

      toast.success(res.data.message, {
        position: "bottom-right",
        theme: "dark",
      });
      console.log(res.data.admin);
      
      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      navigate("/admin/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Invalid admin credentials", {
        position: "bottom-right",
        theme: "dark",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Banner */}
      <div className="hidden md:block md:w-1/2 relative bg-black">
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <h1 className="md:text-8xl text-4xl font-extrabold text-white drop-shadow-xl">
            ADMIN PORTAL
          </h1>
        </div>
      </div>

      {/* Login Card */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl border">
          <h2 className="text-3xl font-bold text-center mb-3">Admin Login</h2>
          <p className="text-center text-gray-600 mb-8">
            Only authorized admins can access the dashboard
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Admin Email
              </label>
              <input
                type="email"
                placeholder="Enter admin email"
                className={`w-full px-4 py-2 rounded-lg border outline-none
                  focus:ring-1 focus:ring-black/40 
                  ${errors.email ? "border-red-500" : "border-gray-300"}
                `}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter admin password"
                className={`w-full px-4 py-2 rounded-lg border outline-none
                  focus:ring-1 focus:ring-black/40
                  ${errors.password ? "border-red-500" : "border-gray-300"}
                `}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-black text-white py-2.5 rounded-lg font-semibold
                transition shadow-md hover:bg-black/90
                ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}
              `}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-8 text-sm">
            © {new Date().getFullYear()} Admin Panel. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
