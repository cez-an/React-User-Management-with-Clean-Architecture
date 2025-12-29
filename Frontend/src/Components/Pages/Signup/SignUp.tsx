import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type SignupForm = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>();

  const onSubmit = async (data: SignupForm) => {
    try {
      await axios.post("http://localhost:3000/user/signup", data);

      toast.success("Account created successfully!", {
        position: "bottom-center",
        theme: "dark",
      });

      navigate("/login");
    } catch (err) {
      toast.error("Something went wrong", {
        position: "bottom-center",
        theme: "dark",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:block md:w-1/2 relative bg-black">
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <h1 className="md:text-8xl text-4xl font-extrabold text-white drop-shadow-xl">
            ZANCE NEWS
          </h1>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl border">
          <h2 className="text-3xl font-bold text-center mb-6">
            Create Account
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Join Zance News and stay updated with the latest headlines
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                 Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className={`w-full px-4 py-2 rounded-lg border outline-none focus:ring-1 
                  ${errors.name ? "border-red-500" : "border-gray-300"}`}
                {...register("name", {
                  required: "Full name is required",
                  minLength: {
                    value: 7,
                    message: "Name must be at least 3 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-2 rounded-lg border outline-none focus:ring-1 
                  ${errors.email ? "border-red-500" : "border-gray-300"}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className={`w-full px-4 py-2 rounded-lg border outline-none focus:ring-1 
                  ${errors.password ? "border-red-500" : "border-gray-300"}`}
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

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-black/80 hover:bg-black text-white py-2.5 rounded-lg font-semibold 
                transition shadow-md ${
                  isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                }`}
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Login
            </button>
          </p>

          <p className="text-center text-gray-500 mt-8 text-sm">
            © {new Date().getFullYear()} ZANCE NEWS. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
