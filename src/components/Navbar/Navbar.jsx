import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import { motion } from "framer-motion";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import AuthContext from "../../context/AuthContext";
import AvatarImg from "../../assets/icons/BusinessmanAvatar.png";
import SearchCompanyModel from "../Modal/SearchCompanyModel";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const isAuthenticated = JSON.parse(localStorage.getItem("tokens"))?.access ? true : false;
  const NavRef = React.useRef();
  const user = JSON.parse(localStorage.getItem("company"));

  return (
    <nav className="px-14 py-4 flex gap-10 shadow-lg items-center fixed top-0 w-full z-50 bg-white">
      <div className="flex items-center gap-4 space-x-4">
        {isAuthenticated && (
          <IconButton onClick={() => setNavbarOpen(true)}>
            <MenuIcon className="cursor-pointer" />
          </IconButton>
        )}
        <h3 className="text-2xl cursor-pointer" onClick={() => navigate("/")}>
          UDHYAM-CONNECT
        </h3>
      </div>

      <div className="relative w-64" onClick={() => setOpenSearchModal(true)}>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" >
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Search by Company Name "
        />
      </div>

      <Modal
        open={navbarOpen}
        onClose={() => setNavbarOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <motion.div
          initial={{ width: "0px" }}
          animate={{
            width: navbarOpen ? "350px" : "0px",
          }}
          className="flex py-3 flex-col gap-4 px-4  w-[350px] bg-white h-[100vh]"
        >
          <div className="close-mu-icon flex w-full relative">
            <IconButton
              onClick={() => setNavbarOpen(false)}
              className="absolute left-full -translate-x-full"
            >
              <CloseIcon />
            </IconButton>
          </div>

          <div className="company-info flex flex-col w-full">
            <div className="company-meta flex flex-col gap-4 items-center py-4">
              <Avatar
                src={AvatarImg}
                className="cursor-pointer"
                sx={{ width: 100, height: 100 }}
              />
              <h3 className="text-xl">{user?.legal_name}</h3>
              <p>{user?.email}</p>
            </div>

            <ul className="navigation flex flex-col gap-4 py-4 px-4">
              <li
                onClick={() => navigate("/myprofile")}
                className="text-center hover:bg-[#00a5ec] hover:text-white border-[#00a5ec] border text-[#00a5ec] cursor-pointer rounded-md"
              >
                <p className="w-full h-ull py-2">Profile</p>
              </li>
              <li
                onClick={() => navigate("/myproducts")}
                className="text-center  hover:bg-[#00a5ec] hover:text-white border-[#00a5ec] border text-[#00a5ec] cursor-pointer -400 rounded-md"
              >
                <p className="w-full h-ull py-2">Products</p>
              </li>
              <li
                onClick={() => navigate("/chats")}
                className="text-center  hover:bg-[#00a5ec] hover:text-white border-[#00a5ec] border text-[#00a5ec] cursor-pointer -400 rounded-md"
              >
                <p className="w-full h-ull py-2">Chats</p>
              </li>
              <li
                onClick={() => navigate("/schemes")}
                className="text-center  hover:bg-[#00a5ec] hover:text-white border-[#00a5ec] border text-[#00a5ec] cursor-pointer -400 rounded-md"
              >
                <p className="w-full h-ull py-2">Schemes</p>
              </li>
            </ul>

            <div className="footer-section mt-14 px-4">
              <Button color="error" variant="contained" className="w-full">
                Log out
              </Button>
            </div>
          </div>
        </motion.div>
      </Modal>

      <Modal open={openSearchModal} onClose={() => setOpenSearchModal(false)}>
        <SearchCompanyModel ref={NavRef} onClose={() => setOpenSearchModal(false)} />
      </Modal>

      <div className="flex items-center ml-auto gap-4">
        {!isAuthenticated ? (
          <>
            <Button onClick={() => navigate("/user/signup")} variant="outlined">
              Register
            </Button>
            <Button onClick={() => navigate("/user/login")} variant="outlined">
              Login
            </Button>
          </>
        ) : (
          <Button onClick={() => logout()} variant="outlined">
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
