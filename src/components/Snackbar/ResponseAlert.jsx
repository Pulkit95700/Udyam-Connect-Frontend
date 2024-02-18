import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ResponseAlert = (props) => {
	const open = props.openResponse;

	// ========= for alert messages===================
	//new
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	const handleClose = (reason) => {
		if (reason === "clickaway") {
			return;
		}
		props.setOpenResponse(false);
	};
	// ===============================================
	return (
		<>
			<Stack spacing={2} sx={{ width: "100%" }}>
				<Snackbar
					open={open}
					autoHideDuration={300000}
					onClose={handleClose}
					xs={{ height: "100%" }}
					anchorOrigin={{ vertical: "top", horizontal: "right" }}
				>
					<Alert
						onClose={handleClose}
						severity={props.errorStatus == true ? "error" : "success"}
						sx={{ width: "100%" }}
						className={
							props.errorStatus == true ? "!bg-red-500" : "!bg-green-600"
						}
					>
						<span>{props.errorValue}</span>
					</Alert>
				</Snackbar>
			</Stack>
		</>
	);
};

export default ResponseAlert;
