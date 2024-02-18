import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { Avatar } from "@mui/material";
import AvatarImg from "../assets/icons/BusinessmanAvatar.png";
import ResponseAlert from "../components/Snackbar/ResponseAlert";
import { publicPostMethod } from "../requests/publicRequests/publicPostMethod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);

  // const [companyName, setCompanyName] = useState("");
  // const [companyOwner, setCompanyOwner] = useState("");
  // const [businessConstitution, setBusinessConstitution] = useState("");
  // const [companyType, setCompanyType] = useState("");
  // const [companyStatus, setCompanyStatus] = useState("");
  // const [companyRegistrationDate, setCompanyRegistrationDate] = useState("");

  // for feedback of verification of gst number
  const [openResponse, setOpenResponse] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorValue, setErrorValue] = useState("");

  const navigate = useNavigate();

  const registerCompany = (companyDetails) => {
    publicPostMethod("user/register/", companyDetails, (response) => {
      if (response?.status == "200" || response?.status == "201") {
        setLoading(false);
        const tokens = response.data.token;
        localStorage.setItem("tokens", JSON.stringify(tokens));
        localStorage.setItem("company", JSON.stringify(response.data?.company))
        navigate("/");
      } else {
        setOpenResponse(true);
        setErrorStatus(true);
        setErrorValue("User already created or invalid credentials");

        setTimeout(() => {
          setOpenResponse(false);
        }, 3000);
        setLoading(false);
      }
    });
  };
  const verifyGST = async (e) => {
    e.preventDefault();

    setLoading(true);
    const updatedGstNo = gstNo.trim();
    axios
      .get(
        `https://powerful-gstin-tool.p.rapidapi.com/v1/gstin/${updatedGstNo}/basic`,
        {
          headers: {
            "X-RapidAPI-Key":
              "e73e3d0c41msh50806532b31699dp168d3ejsna80b460d7f44",
            "X-RapidAPI-Host": "powerful-gstin-tool.p.rapidapi.com",
          },
        }
      )
      .then((response) => {

        setOpenResponse(true);
        setErrorStatus(false);
        setErrorValue("GST number verified");

        setTimeout(() => {
          setOpenResponse(false);
        }, 3000);

        const companyDetails = {
          username: username,
          password: password,
          password2: confirmPassword,
          email: email,
          company_name: response.data.data.trade_name,
          legal_name: response.data.data.legal_name,
          gst_no: gstNo,
          constitution: response.data.data.business_constitution,
          contact: phoneNo,
          type: response.data.data.type,
          status: response.data.data?.status,
          city: city,
          state: state,
          pincode: pincode,
        };

        registerCompany(companyDetails);
      })
      .catch((error) => {
        console.log(error);
        setOpenResponse(true);
        setErrorStatus(true);
        setErrorValue("GST number verification failed.");

        setTimeout(() => {
          setOpenResponse(false);
        }, 3000);
        setLoading(false);
      });
  };

  return (
    <>
      <ResponseAlert
        openResponse={openResponse}
        setOpenResponse={setOpenResponse}
        errorStatus={errorStatus}
        errorValue={errorValue}
      />
      <Layout>
        <main className="flex flex-col gap-10 items-center w-full bg-[#265E7D] py-10">
          <div className="flex flex-col relative items-center rounded-[1rem] mt-[50px] w-[450px] gap-4 border bg-[#D2D2D2] border-[#00a5ec] px-6 py-8">
            <Avatar
              src={AvatarImg}
              className="!w-[80px] !h-[80px] !absolute top-[-40px]"
            />
            <h3 className="text-center text-xl mt-[20px] font-semibold">
              Sign up
            </h3>

            <form onSubmit={verifyGST} className="flex flex-col gap-4">
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-2 border-white w-[300px] placeholder:text-[#d2d2d2] rounded-full px-4 py-2"
              />
              <input
                type="text"
                id="gstNo"
                placeholder="GST number"
                value={gstNo}
                minLength={15}
                maxLength={15}
                onChange={(e) => setGstNo(e.target.value)}
                className="border-2 border-white placeholder:text-[#d2d2d2] rounded-full px-4 py-2"
              />
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-white w-[300px] placeholder:text-[#d2d2d2] rounded-full px-4 py-2"
              />
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  id="city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border-2 border-white w-[300px] placeholder:text-[#d2d2d2] rounded-full px-4 py-2"
                />
                <input
                  type="text"
                  id="state"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="border-2 border-white w-[300px] placeholder:text-[#d2d2d2] rounded-full px-4 py-2"
                />
                <input
                  type="text"
                  id="pincode"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="border-2 border-white w-[300px] placeholder:text-[#d2d2d2] rounded-full px-4 py-2"
                />
              </div>
              <input
                type="text"
                id="phoneNo"
                placeholder="Phone number"
                minLength={10}
                maxLength={10}
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="border-2 border-white placeholder:text-[#d2d2d2] rounded-full px-4 py-2"
              />
              <input
                type="text"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-white w-[300px] placeholder:text-[#d2d2d2] rounded-full px-4 py-2"
              />
              <input
                type="text"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-2 border-white placeholder:text-[#d2d2d2] rounded-full px-4 py-2"
              />

              <p className="text-black text-center">Forgot password?</p>

              <button
                onClick={verifyGST}
                type="submit"
                className="bg-red-400 hover:bg-red-600 transition-all duration-150 text-white rounded-md px-4 py-2 mt-4 text-xl"
              >
                {loading ? "Verifying" : "Verify and Sign up"}
              </button>
            </form>
          </div>
          <p>
            Already have an account?{" "}
            <span className="text-white mt-10">Login</span>
          </p>
          <button
            type="submit"

            className="bg-[#F86949] hover:bg-[#ee9480] transition-all duration-150 text-white rounded-md px-10 py-2 mt-4 text-xl"
          >
            Login Now!
          </button>
        </main>
      </Layout>
    </>
  );
};

export default Signup;
