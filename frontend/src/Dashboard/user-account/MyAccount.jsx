import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import userImg from "../../assets/images/Star.png";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL, token } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import ConfirmPopUp from "../../pages/ConfirmPopUp";
import { toast } from "react-toastify";

const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");
  const [isConfirmPopUpOpen, setIsConfirmPopUpOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/users/profile/me`
  );

  const handleExpiredToken = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (error && error.message === "Token has been expired") {
      handleExpiredToken();
    }
  }, [error]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users/${data._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);

      // Log the user out and redirect to the login page
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {/* {loading && !error && <Loading />} */}
        {/* {error && !loading && handleExpiredToken()} */}
        {error && !loading && <Error errorMsg={error} />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  <img
                    src={data.photo ? data.photo : userImg}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {data.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {data.email}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood Type:{" "}
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {data.bloodType}
                  </span>
                </p>
              </div>

              <div className="mt-[50px] md:mt-[100px]">
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                >
                  Logout
                </button>
                <button
                  className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white"
                  onClick={() => setIsConfirmPopUpOpen(true)}
                >
                  Delete account
                </button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("bookings")}
                  className={` ${
                    tab === "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7
            border border-solid border-primaryColor`}
                >
                  My Bookings
                </button>

                <button
                  onClick={() => setTab("settings")}
                  className={` ${
                    tab === "settings" &&
                    "bg-primaryColor text-white font-normal"
                  } py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7
            border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>
              {tab === "bookings" && <MyBookings />}
              {tab === "settings" && <Profile user={data} />}
            </div>
          </div>
        )}
      </div>
      <ConfirmPopUp
        isOpen={isConfirmPopUpOpen}
        onClose={() => setIsConfirmPopUpOpen(false)} // Close the modal
        onConfirm={handleDeleteAccount} // Confirm delete action
        title="Confirm Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone."
      />
    </section>
  );
};

export default MyAccount;

// Its all about the account section
