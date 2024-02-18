import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import EditProductModal from "./EditProductModal";
import { Modal } from "@mui/material";
import DeleteProductModal from "../Modal/DeleteModal";
import Dialog from "@mui/material/Dialog";
import { privateDeleteMethod } from "../../requests/privateRequests/privateDeleteMethod";
import { useDispatch } from "react-redux";
import {
  setOpenResponse,
  setErrorStatus,
  setErrorValue,
} from "../../reducers/ResponseSlice";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product, handleActionState }) => {
  const [openEditProductModal, setOpenEditProductModal] = useState(false);
  const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false);

  const myRef = React.createRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteProduct = () => {
    privateDeleteMethod(`products/myproducts/${product.id}`, {}, (response) => {
      if (response.status >= 200 && response.status < 300) {
        handleActionState();
        dispatch(setOpenResponse(true));
        dispatch(setErrorStatus(false));
        dispatch(setErrorValue("Product deleted successfully"));

        setTimeout(() => {
          dispatch(setOpenResponse(false));
        }, 3000);
      } else {
        dispatch(setOpenResponse(true));
        dispatch(setErrorStatus(true));
        dispatch(setErrorValue("Product could not be deleted."));

        setTimeout(() => {
          dispatch(setOpenResponse(false));
        }, 3000);
      }
    });
  };
  return (
    <>
      <div className="rounded-lg shadow-lg border border-[#dbdbdb] h-72 py-4 px-4 flex cursor-pointer gap-6">
        <div className="border border-black p-2 w-64">
          <img
            className="w-full h-full object-cover"
            src={`${product?.image}`}
            alt={product.imageAlt}
          />
        </div>
        <div className="flex flex-col gap-2 flex-1 pr-2">
          <h3 className="text-2xl font-semibold">{product.name}</h3>
          <p className="text-md h-10 overflow-y-hidden text-gray-500">
            {product.description}
          </p>
          <p className="text-lg text-green-500">₹ {product.price}</p>
          <div className="flex gap-6">
            <p className="text-md category">
              <span className="font-semibold">Length</span> : {product.length}
            </p>
            <p className="text-md category">
              <span className="font-semibold">Breadth</span> : {product.breadth}
            </p>
            <p className="text-md category">
              <span className="font-semibold">Height</span> : {product.height}
            </p>
          </div>
          <p className="text-md category">
            <span className="font-semibold">Category</span> :{" "}
            {product.category.name}
          </p>
          <div className="buttons flex gap-2 w-full relative mt-2">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenEditProductModal(true)}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenDeleteProductModal(true)}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <p className="text-md flex items-center gap-4 self-end absolute right-0">
              <span>
                <span className="text-xs">🟢</span> Available
              </span>
              <span
                onClick={() => navigate(`/product/${product.id}`)}
                className="text-md text-blue-600 texxt-sm cursor-pointer hover:underline hover:text-blue-800"
              >
                View
              </span>
            </p>
          </div>
        </div>
      </div>
      <Modal
        open={openEditProductModal}
        onClose={() => setOpenEditProductModal(false)}
      >
        <EditProductModal
          ref={myRef}
          handleActionState={handleActionState}
          onClose={() => setOpenEditProductModal(false)}
          product={product}
        />
      </Modal>
      <Dialog
        onDelete={deleteProduct}
        open={openDeleteProductModal}
        onClose={() => setOpenDeleteProductModal(false)}
      >
        <DeleteProductModal
          ref={myRef}
          onDelete={deleteProduct}
          onClose={() => setOpenDeleteProductModal(false)}
        />
      </Dialog>
    </>
  );
};

export default ProductItem;
