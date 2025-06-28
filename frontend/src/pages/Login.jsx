import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext.jsx";
import HashLoader from "react-spinners/HashLoader.js";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { dispatch } = useContext(authContext);

  // Handle logout reasons and show appropriate messages
  useEffect(() => {
    const reason = searchParams.get('reason');
    
    if (reason) {
      switch (reason) {
        case 'inactivity':
          toast.warning("Your session expired due to inactivity. Please log in again.");
          break;
        case 'token_expired':
          toast.warning("Your session has expired. Please log in again.");
          break;
        case 'session_expired':
          toast.warning("Your session has expired. Please log in again.");
          break;
        case 'unauthorized':
          toast.error("You are not authorized to access this resource.");
          break;
        case 'network_error':
          toast.error("Network error occurred. Please check your connection and try again.");
          break;
        case 'no_refresh_token':
          toast.warning("Session expired. Please log in again.");
          break;
        case 'invalid_refresh_token':
          toast.warning("Invalid session. Please log in again.");
          break;
        default:
          break;
      }
      
      // Clear the reason from URL
      navigate('/login', { replace: true });
    }
  }, [searchParams, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          role: result.role,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        },
      });

      setLoading(false);
      toast.success(result.message);
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello <span className="text-primaryColor">Welcome</span>Back
        </h3>

        <form className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none foucs:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
            />
          </div>

          <div className="mb-5">
            <input
              type="password"
              placeholder="Enter your Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none foucs:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
            />
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="w-full px-4 py-3 bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg "
            >
              {loading ? <HashLoader size={25} color="fff" /> : "Login"}
            </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            Don&apos; have an account?
            <Link to="/register" className="text-primaryColor font-medium ml-1">
              {" "}
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
