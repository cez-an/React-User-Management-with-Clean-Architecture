import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  selectCurrentUser,
  fetchCurrentUser,
  logout,
} from "../../../features/auth/authSlice";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

interface FormValues {
  name: string;
  email: string;
  profileImage?: string;
}

const ProfileEdit = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectCurrentUser);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();


  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser())
        .unwrap()
        .catch(() => navigate("/login"));
    } else {
      reset({
        name: user.name,
        email: user.email,
        profileImage: user.profileImage || "",
      });

      setPreviewImage(user.profileImage || "");
    }
  }, [user, dispatch, reset, navigate]);


  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Only JPG or PNG images allowed", { theme: "dark" });
      setError("profileImage", { message: "Invalid image type" });
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image must be under 2MB", { theme: "dark" });
      setError("profileImage", { message: "Image too large" });
      return;
    }

    const base64 = await convertToBase64(file);
    setPreviewImage(base64);
    setValue("profileImage", base64);
  };


  const onSubmit = async (data: FormValues) => {
    try {
      await axios.put(
        `http://localhost:3000/user/update/${user?.id}`,
        data,
        { withCredentials: true }
      );

      toast.success("Profile updated!", { theme: "dark" });

     
      // dispatch(fetchCurrentUser());

      navigate("/home");
    } catch {
      toast.error("Something went wrong!", { theme: "dark" });
    }
  };

  /* =========================
     LOGOUT
     ========================= */
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  /* =========================
     UI
     ========================= */
  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full h-16 backdrop-blur-lg bg-black text-white flex items-center justify-between px-8 shadow-md">
        <h2 className="text-2xl font-bold tracking-wide">ZANCE NEWS</h2>

        <div className="relative">
          <img
            src={user?.profileImage || "https://i.pravatar.cc/150?img=3"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border cursor-pointer"
            onClick={() => setOpenDropdown(!openDropdown)}
          />

          {openDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow border py-2">
              <button
                onClick={() => navigate("/profile")}
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                View Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* FORM */}
      <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow mt-10">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Edit Profile
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* IMAGE */}
            <div className="flex flex-col items-center">
              <img
                src={previewImage || "https://i.pravatar.cc/150?img=3"}
                className="w-28 h-28 rounded-full object-cover border shadow"
              />

              <label className="mt-3 cursor-pointer text-blue-600 font-semibold">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {errors.profileImage && (
                <p className="text-red-500 text-sm">
                  {errors.profileImage.message}
                </p>
              )}
            </div>

            {/* NAME */}
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Min 3 characters" },
                })}
                className="w-full border px-4 py-2 rounded-lg"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
                className="w-full border px-4 py-2 rounded-lg"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg font-semibold"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
