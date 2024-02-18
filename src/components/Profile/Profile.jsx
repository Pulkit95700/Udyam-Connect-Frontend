import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import BgCoverImg from "../../assets/bgCover.jpg";
import { Avatar } from "@mui/material";
import AvatarImg from "../../assets/icons/BusinessmanAvatar.png";
import ProductBlockList from "../Products/ProductBlockList";
import { privateGetMethod } from "../../requests/privateRequests/privateGetMethod";
import Map from "../Map/Map";

const MyProfile = () => {
  const user = JSON.parse(localStorage.getItem("company"));
  const [companyProducts, setCompanyProducts] = useState([]);

  const getUserProducts = () => {
    privateGetMethod("/products?company=" + user.id, {}, (response) => {
      if (response.status >= 200 && response.status < 300) {
        setCompanyProducts(response.data.data);
      } else {
        console.log(response);
      }
    });
  };

  useEffect(() => {
    getUserProducts();
  }, []);
  // privateGetMethod(
  //   `/api/v1/product/?company=${user.id}`,
  //   {},
  //   (response) => {
  //     if (response.status === 200) {
  //       console.log(response.data);
  //       setProducts(response.data);
  //     } else {
  //       console.log(response);
  //     }
  //   }
  // );

  return (
    <Layout>
      <div className="flex flex-col  px-14 mt-8 rouned-lg">
        <div className="flex border h-[85vh] border-[#dbdbdb] rounded-xl shadow-lg flex-col gap-4 mt-4">
          <div className="flex flex-col gap-4 h-64 cover-pic">
            <img
              src={BgCoverImg}
              className="w-full h-full object-cover rounded-t-xl"
              alt=""
            />
          </div>
          <div className="profile-info relative px-8">
            <Avatar
              src={AvatarImg}
              className="!w-[125px] !h-[125px] !absolute -translate-y-[60%]"
            />

            <div className="flex justify-between">
              <span className="mt-14 text-2xl font-semibold">
                {user.legal_name}
              </span>
              <span className="mt-14 text-2xl font-semibold self-end">
                {user.company_name}
              </span>
            </div>
            <p className="text-md h-24 text-gray-600 mt-4">
              Google, the tech giant headquartered in Mountain View, California,
              has become an integral part of our digital lives, shaping the way
              we access information, connect with others, and navigate the
              online world. shaping the way we access information, connect with
              others, and navigate the online world. shaping the way we access
              information, connect with others, and navigate the online world.
              shaping the way we access information, connect with others, and
              navigate the online world.
            </p>

            <div className="flex gap-8">
              <div className="flex  gap-2">
                <span className="text-gray-700">Email: </span>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-700">Type: </span>
                <span className="text-gray-500">{user.constitution}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-700">Contact: </span>
                <span className="text-gray-500">{user.contact}</span>
              </div>
            </div>
            <div className="flex gap-8 mt-2">
              <div className="flex  gap-2">
                <span className="text-gray-700">City: </span>
                <span className="text-gray-500">{user.city}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-700">State: </span>
                <span className="text-gray-500">{user.state}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-700">Pincode: </span>
                <span className="text-gray-500">{user.pincode}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4 rouned-lg mb-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2777.405277515392!2d78.80087265097008!3d25.55959054102952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3977998602df8795%3A0xcc7bc0f288496bb0!2sAnkit%20Traders!5e0!3m2!1sen!2sin!4v1694945725075!5m2!1sen!2sin"
            className="w-full border border-[#dbdbdb] roun"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="flex border bg-white mb-8 border-[#dbdbdb] rounded-xl shadow-lg flex-col gap-4 mt-4">
          <h1 className="text-2xl font-semibold ml-8 mt-4">Recent Products</h1>

          <div className="flex flex-col gap-4 self-start w-full">
            <ProductBlockList products={companyProducts} maxElements={4} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyProfile;
