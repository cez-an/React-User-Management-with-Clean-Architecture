import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { images } from "../../../assets/images";
import axios from "axios";
import { useAppDispatch } from "../../../hooks";
import { logout } from "../../../features/auth/authSlice";

const Home = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);

  const [user, setUser] = useState<{
    profileImage: string;
    email: string;
    id: string;
    role: string;
    name: string;
  }>({
    email: "",
    id: "",
    name: "",
    role: "",
    profileImage: ""
  });

useEffect(() => {
  const fetchUser = async () => {
    try {
      const data = await JSON.parse(localStorage.getItem("user") || "{}");
      const res = await axios.get(`http://localhost:3000/user/findUser/${data.email}`);
      
      if(res.data.user.isBlocked){
        localStorage.clear();
        navigate('/login');
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  fetchUser();
}, []);


 const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
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

      
      <div className="px-10 py-8 bg-black/5 min-h-screen text-gray-800">
        <h2 className="text-xl text-gray-600 mb-2">
          Welcome back,
          <span className="font-semibold text-gray-900"> {user.name}</span>
        </h2>

        <div className="space-y-14 mt-6">
         
                    <section>
            <h3 className="text-3xl font-bold mb-6 tracking-tight">
              Top Headlines
            </h3>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition">

              <img
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80"
                className="w-full md:w-1/2 h-72 object-cover"
              />

              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-3">
                  Global Markets Surge as Tech Stocks Hit New Highs
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Major tech companies reported strong quarterly profits, boosting
                  investor confidence across the global market. Analysts suggest
                  further growth ahead.
                </p>

                <button className="mt-4 font-semibold ">
                  Read full story →
                </button>
              </div>
            </div>
          </section>

         
          <section>
            <h3 className="text-2xl font-bold mb-6">Trending Now</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

           
              {images.map((card, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border"
                >
                  <img
                    src={card.img}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-5">
                    <h4 className="font-bold text-lg">{card.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{card.desc}</p>
                  </div>
                </div>
              ))}

            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;

