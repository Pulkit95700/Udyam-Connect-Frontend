import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import ProductOptionsModal from "../Modal/ProductOptionsModal";

const AddOptions = (props) => {
  const [openProductModal, setOpenProductModal] = useState(false);
  //   const handleClick = (e) => {
  //     if (!e.target.closest("#add-options")) {
  //       props.setShowOptions(false);
  //     }
  //   };

  return (
    <div
      id={"add-options"}
      className={`pt-2 flex flex-col gap-3 w-48 ${props.className}`}
    >
      <h3 className="px-4 font-semibold text-lg">Options</h3>
      <ul className="flex flex-col  pb-2">
        <li onClick={() => setOpenProductModal(true)} className="flex px-4 py-2 text-lg hover:cursor-pointer hover:bg-gray-100  items-center gap-3">
          <span className="text-sm">Send a Product</span>
        </li>
        <Modal
          open={openProductModal}
          onClose={() => setOpenProductModal(false)}
        >
          <ProductOptionsModal onClose={() => setOpenProductModal(false)} />
        </Modal>
        <li className="flex px-4 py-2 text-lg hover:cursor-pointer hover:bg-gray-100  items-center gap-3">
          <span className="text-sm">Send Info</span>
        </li>
      </ul>
    </div>
  );
};

export default AddOptions;
