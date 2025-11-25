import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; 
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      profileImage: "",
    },
  });

  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("profileImage", user.profileImage || "");
    setPreviewImage(user.profileImage);
  }, []);

  
  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  
  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Only JPG or PNG images are allowed!", {
        position: "bottom-right",
        theme: "dark",
      });
      setError("profileImage", { message: "Invalid file type" });
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image must be less than 2 MB!", {
        position: "bottom-right",
        theme: "dark",
      });
      setError("profileImage", { message: "Image too large" });
      return;
    }

    const base64 = await convertToBase64(file);
    setPreviewImage(base64);
    setValue("profileImage", base64);
  };

  const handleLogout = () => {
    toast.error("Logged Out successfully", {
      position: "bottom-right",
      theme: "dark",
    });
    localStorage.removeItem("user");
    navigate("/login");
  };

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/user/update/${user.id}`,
        data
      );

      toast.success("Profile updated!", {
        position: "bottom-right",
        theme: "dark",
      });

      localStorage.setItem("user", JSON.stringify(res.data.updatedUser));

      navigate("/home");
    } catch (err) {
      toast.error("Something went wrong!", {
        position: "bottom-right",
        theme: "dark",
      });
    }
  };

  return (
    <>
      
      <nav className="w-full h-16 backdrop-blur-lg bg-black text-white flex items-center justify-between px-8 shadow-md relative">
        <h2 className="text-2xl font-bold tracking-wide">ZANCE NEWS</h2>

        <div className="relative">
          <img
            src={user.profileImage || "https://i.pravatar.cc/150?img=3"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border border-gray-600 shadow cursor-pointer"
            onClick={() => setOpenDropdown(!openDropdown)}
          />

          {openDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg border py-2 z-50">
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                View Profile
              </button>

              <button
                onClick={() => navigate("/profile/edit")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

     
      <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md border mt-10">
          <h2 className="text-3xl font-bold mb-6 text-center">Edit Profile</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            <div className="flex flex-col items-center">
              <img
                src={previewImage || "https://i.pravatar.cc/150?img=3"}
                className="w-28 h-28 rounded-full object-cover border shadow-lg"
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.profileImage.message}
                </p>
              )}

              <p className="text-xs text-gray-500 mt-1">
                Max 2 MB (JPG or PNG)
              </p>
            </div>

            
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Name must be 3+ characters" },
                })}
                className="w-full border px-4 py-2 rounded-lg"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
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
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg font-semibold mt-4"
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
