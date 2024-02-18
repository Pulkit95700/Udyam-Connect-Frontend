import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { privateGetMethod } from "../../../requests/privateRequests/privateGetMethod";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const ProductFilter = (props) => {
  // const productName = props;
  // const [productData, setProductData] = useState([]);

  const navigate = useNavigate();

  const productLinks = [
    {
      label: "Search Products",
      link: "/products",
    },
    {
      label: "See Your Products",
      link: "/myproducts",
    },
    {
      label: "Add Product",
      link: "/myproducts",
    },
    {
      label: "Delete Product",
      link: "/myproducts",
    },
    {
      label: "Edit Product",
      link: "/myproducts",
    },
  ];

  return (
    <Stack direction="column" spacing={1}>
      {productLinks.map((link) => {
        return (
          <Chip
            label={link.label}
            onClick={() => navigate(link.link)}
            variant="outlined"
          />
        );
      })}
    </Stack>
  );
};

export default ProductFilter;
