import React from "react";
import {
    AppBar,
    Container,
    MenuItem,
    Select,
    Toolbar,
    Typography,
} from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";

const Header = () => {
    const navigate = useNavigate();
    const { currency, setCurrency, user } = CryptoState();

    // console.log(currency);

    const TitleTypography = styled(Typography)(({ theme }) => ({
        flex: 1,
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
    }));

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <TitleTypography
                            onClick={() => navigate("/")}
                            variant="h6"
                        >
                            Crypto Tracker
                        </TitleTypography>
                        <Select
                            variant="outlined"
                            style={{ width: 100, height: 40, marginRight: 15 }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"PHP"}>PHP</MenuItem>
                        </Select>
                        {user ? <UserSidebar /> : <AuthModal />}
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default Header;
