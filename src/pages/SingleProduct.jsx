import React, { useEffect, useState } from "react";
import ProrductImg from "../assets/Product1.jpg";
import Layout from "../components/Layout/Layout";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { privateGetMethod } from "../requests/privateRequests/privateGetMethod";
import Loading from "../components/ui/Loading";

const SingleProduct = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const getProductData = () => {
    privateGetMethod(`products/${id}`, {}, (response) => {
      if (response.status >= 200 && response.status < 300) {
        setProduct(response?.data?.data);

        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    getProductData();
  }, []);

  if (loading) return;
  <div className="w-32 h-32 mt-[4.6rem]">
    <Loading />;
  </div>;

  return (
    <Layout>
      <div className="flex w-full h-[]">
        <div className="flex flex-col w-1/2 h-[calc(100vh-4.6rem)] overflow-y-scroll">
          <img
            src={`http://localhost:8000${product?.image}`}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="product-info w-1/2 overflow-y-scroll h-[calc(100vh-4.6rem)] py-6 px-6 flex flex-col gap-6">
          <h3 className="text-4xl font-semibold">{product?.name}</h3>
          <p className="description text-md h-24 overflow-y-hidden text-gray-500">
            {product?.description}
          </p>
          <div className="flex gap-4">
            <p className="head text-xl text-green-400">Price: </p>
            <p className="text-xl text-green-400 font-semibold">
              Rs. {product?.price}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-xl text-gray-400">Dimensions:</p>
            <p className="text-xl text-gray-400 font-semibold">
              {`${product?.length} x ${product?.breadth} x ${product?.height}`}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-xl text-red-300">Weight:</p>
            <p className="text-xl text-red-300 font-semibold">
              {`${product?.weight}`}
            </p>
          </div>
          <div className="flex gap-4">
            <p className="head text-xl text-blue-400  ">Category:</p>
            <p className="text-xl text-blue-400 font-semibold">
              {product.category?.name}
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <h3 className="text-2xl">Company Details: </h3>
            <div className="flex gap-2 mt-2 flex-col text-sm text-gray-500">
              <div className="flex gap-2">
                <p className="text-md">Company name:</p>
                <p className="text-md">{product.company?.company_name}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-md">Contact:</p>
                <p className="text-md">{product.company?.contact}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-md">Address:</p>
                <p className="text-md">{`${product.company?.city}, ${product.company?.state}, ${product.company?.pincode}`}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-2">
            <Button variant="contained" color="primary">
              Add to Cart
            </Button>
            <Button
              onClick={() => navigate("/chats/" + product.company?.id)}
              variant="contained"
              color="primary"
            >
              Message
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProduct;
