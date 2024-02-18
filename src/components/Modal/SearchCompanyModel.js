import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { privateGetMethod } from "../../requests/privateRequests/privateGetMethod";
import { useNavigate } from "react-router-dom";

const SearchCompanyModel = React.forwardRef((props, ref) => {
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState([]);

  const getCompanies = () => {
    privateGetMethod(`user/companies?search=${search}`, {}, (response) => {
      if (response.status >= 200 && response.status < 300) {
        setCompanies(response?.data?.data);
      } else {
        console.log(response);
      }
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    getCompanies();
  }, [search]);

  return (
    <div className="w-[500px] bg-white rounded-lg absolute left-1/2 -translate-x-1/2 top-10 shadow-lg py-6">
      <form className="px-4">
        <div className="relative w-full ">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search by Company Name "
          />
        </div>
      </form>

      <h3 className="text-xl font-semibold mt-8 px-4">Companies</h3>

      <div className="mt-4 flex flex-col gap-6">
        <ul className="flex flex-col">
          {companies.map((company) => (
            <li
              onClick={() => navigate("/profile/" + company.id)}
              className="border-b hover:bg-gray-200 px-4 py-4 items-center cursor-pointer border-[#dbdbdb] flex gap-4"
            >
              <Avatar />
              <h3 className="">{company.company_name}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default SearchCompanyModel;
