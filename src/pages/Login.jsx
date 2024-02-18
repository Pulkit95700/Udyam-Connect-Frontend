import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Layout from "../components/Layout/Layout";
import { Avatar } from "@mui/material";
import AvatarImg from "../assets/icons/BusinessmanAvatar.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginuser } = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    loginuser(username, password);
  };

  return (
    <Layout>
      <main className="flex flex-col gap-10 items-center w-full bg-[#265E7D] h-[calc(100vh-4.6rem)]">
        <div className="flex flex-col relative items-center rounded-[1rem] mt-[100px] w-[450px] gap-4 border bg-[#D2D2D2] border-[#00a5ec] px-6 py-8">
          <Avatar src={AvatarImg} className="!w-[80px] !h-[80px] !absolute top-[-40px]" />
          <h3 className="text-center text-xl mt-[20px] font-semibold">Login</h3>

          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 border-white w-[300px] placeholder:text-[#d2d2d2] rounded-full px-4 py-2"
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-white placeholder:text-[#d2d2d2] rounded-full px-4 py-2"
            />

            <p className="text-black text-center">Forgot password?</p>

            <button
              type="submit"
              onClick={submitHandler}
              className="bg-[#4A574C] hover:bg-black transition-all duration-150 text-white rounded-md px-4 py-2 mt-4 text-xl"
            >
              Login
            </button>
          </form>
        </div>
        <p>Don't have an account? <span className="text-white mt-10">Signup</span></p>
        <button
              type="submit"
              className="bg-[#F86949] hover:bg-[#ee9480] transition-all duration-150 text-white rounded-md px-10 py-2 mt-4 text-xl"
            >
              Sign up Now!
        </button>
      </main>
    </Layout>
  );
};

export default Login;
