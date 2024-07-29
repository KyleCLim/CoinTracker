import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { CryptoState } from "../CryptoContext";

const Notice = () => {
    const { alert, setAlert } = CryptoState();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setAlert({ open: false });
    };

    return (
        <Snackbar
            open={alert.open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                elevation={10}
                severity={alert.severity}
                variant="filled"
                sx={{ width: "100%" }}
            >
                {alert.message}
            </Alert>
        </Snackbar>
    );
};

export default Notice;
