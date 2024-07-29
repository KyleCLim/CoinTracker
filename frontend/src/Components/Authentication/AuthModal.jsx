import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import { AppBar } from "@mui/material";
import Login from "./Login";
import SignUp from "./SignUp";
import { styled } from "@mui/material/styles";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../CryptoContext";

export default function AuthModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { setAlert } = CryptoState();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                setAlert({
                    open: true,
                    message: `Sign Up Successful. Welcome ${res.user.email}`,
                    severity: "success",
                });
                handleClose();
            })
            .catch((error) => {
                setAlert({
                    open: true,
                    message: error.message,
                    severity: "error",
                });
                return;
            });
    };

    const TabContainer = styled("div")(({ theme }) => ({
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        color: "white",
        borderRadius: 10,
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    }));

    const GoogleAuth = styled(Box)(({ theme }) => ({
        padding: 24,
        paddingTop: 0,
        backgroundColor: "#272727",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        gap: 20,
        fontSize: 20,
    }));

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Button
                variant="contained"
                style={{
                    width: 85,
                    height: 40,
                    backgroundColor: "#EEBC1D",
                }}
                onClick={handleOpen}
            >
                Login
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <TabContainer>
                        <AppBar
                            position="static"
                            style={{
                                backgroundColor: "transparent",
                                color: "white",
                            }}
                        >
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="fullWidth"
                                style={{ borderRadius: 10 }}
                            >
                                <Tab label="Login" />
                                <Tab label="Sign Up" />
                            </Tabs>
                        </AppBar>
                        {value === 0 && <Login handleClose={handleClose} />}
                        {value === 1 && <SignUp handleClose={handleClose} />}
                        <GoogleAuth>
                            <span>OR</span>
                            <GoogleButton
                                style={{
                                    width: "100%",
                                    outline: "none",
                                }}
                                onClick={signInWithGoogle}
                            ></GoogleButton>
                        </GoogleAuth>
                    </TabContainer>
                </Fade>
            </Modal>
        </div>
    );
}
