import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { PuffLoader } from "react-spinners";
import { getProfile } from "../Redux/Apis/getProfile";
import { setProfileData } from "../Redux/Slices/ProfileSlice";
import { LogOut } from "../Redux/Apis/logout";
function Profile() {
  const navigate = useNavigate();
  const { profileData, loading } = useSelector((state) => state.profileSlice);
  const dispatch = useDispatch();
  const image = {
    male: "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
    female:
      "https://www.svgrepo.com/show/382097/female-avatar-girl-face-woman-user-9.svg",
  };
  async function handleLogout() {
    const resp = await LogOut();
    console.log(resp.message);
    if (resp?.message === "Logout successful") {
      localStorage.removeItem("role");
      window.dispatchEvent(new Event("storage"));
      navigate("/login");
    }
  }
  useEffect(() => {
    async function fetch() {
      const resp = await getProfile();
      dispatch(setProfileData(resp));
    }
    fetch();
  }, []);
  if (loading)
    return (
      <div className="flex h-[70vh] justify-center items-center">
        <PuffLoader />
      </div>
    );
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="bg-gradient-to-b from-white to-gray-100 p-8 rounded-xl shadow-2xl shadow-black max-w-md w-full text-center transform transition-transform hover:scale-105">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Welcome {profileData?.role.toUpperCase()}
        </h2>
        <img
          src={profileData?.gender === "male" ? image.male : image.female}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg border-4 border-gray-300"
        />
        <p className="text-2xl font-semibold text-gray-700 mb-1">
          {profileData?.name.toUpperCase()}
        </p>
        <p className="text-gray-500 mb-6 text-xl">{profileData?.email}</p>
        <button
          className="flex items-center justify-center gap-2 w-full bg-transparent border-b-2 border-red-900 text-gray-900 py-2 px-0 rounded-none text-lg font-medium hover:bg-red-200 transition-all duration-300"
          onClick={handleLogout}
        >
          <FiLogOut className="text-4xl" /> Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
