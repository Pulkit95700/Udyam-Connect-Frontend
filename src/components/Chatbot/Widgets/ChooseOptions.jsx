import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const ChooseOptions = (props) => {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Company"
        onClick={props.payload.handleCompany}
        variant="outlined"
      />
      <Chip
        label="Products"
        onClick={props.payload.handleProduct}
        variant="outlined"
      />
      <Chip
        label="Query"
        onClick={props.payload.handleQuery}
        variant="outlined"
      />
    </Stack>
  );
};

export default ChooseOptions;
