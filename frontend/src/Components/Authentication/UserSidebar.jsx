import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { CryptoState } from "../../CryptoContext";
import { Avatar } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../Banner/Carousel";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

export default function UserSidebar() {
    const [state, setState] = React.useState({
        right: false,
    });
    const { user, setAlert, watchlist, coins, symbol } = CryptoState();

    const SidebarContainer = styled("div")(({ theme }) => ({
        width: 350,
        padding: 25,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
    }));

    const Profile = styled("div")(({ theme }) => ({
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%",
    }));

    const Picture = styled(Avatar)(({ theme }) => ({
        width: 200,
        height: 200,
        cursor: "pointer",
        backgroundColor: "#EEBC1D",
        objectFit: "contain",
    }));

    const LogoutButton = styled(Button)(({ theme }) => ({
        width: "100%",
        height: "8%",
        backgroundColor: "#EEBC1D",
        marginTop: 20,
        "&:hover": { backgroundColor: "grey" },
    }));

    const Watchlist = styled("div")(({ theme }) => ({
        display: "flex",
        flex: 1,
        width: "100%",
        backgroundColor: "grey",
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        overflowY: "scroll",
    }));

    const Coin = styled("div")(({ theme }) => ({
        padding: 10,
        borderRadius: 5,
        color: "black",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#EEBC1D",
        boxShadow: "0 0 3px black",
    }));

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const removeFromWatchList = async (coin) => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(
                coinRef,
                {
                    coins: watchlist.filter((watch) => watch !== coin?.id),
                },
                { merge: "true" }
            );
            setAlert({
                open: true,
                message: `${coin.name} is removed from the Watchlist!`,
                severity: "success",
            });
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                severity: "error",
            });
        }
    };

    const logOut = () => {
        signOut(auth);
        setAlert({
            open: true,
            severity: "success",
            message: "Logout Successfull!",
        });
        toggleDrawer();
    };

    return (
        <div>
            {["right"].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        onClick={toggleDrawer(anchor, true)}
                        style={{
                            height: 38,
                            width: 38,
                            cursor: "pointer",
                            backgroundColor: "#EEBC1D",
                        }}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <SidebarContainer>
                            <Profile>
                                <Picture
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                />
                                <span
                                    style={{
                                        width: "100%",
                                        fontSize: 25,
                                        textAlign: "center",
                                        fontWeight: "bolder",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {user.displayName || user.email}
                                </span>
                                <Watchlist>
                                    <span
                                        style={{
                                            fontSize: 15,
                                            textShadow: "0 0 5px black",
                                        }}
                                    >
                                        Watchlist
                                    </span>
                                    {coins.map((coin) => {
                                        if (watchlist.includes(coin.id))
                                            return (
                                                <Coin key={coin.name}>
                                                    <span>{coin.name}</span>
                                                    <span
                                                        style={{
                                                            display: "flex",
                                                            gap: 8,
                                                        }}
                                                    >
                                                        {symbol}
                                                        {numberWithCommas(
                                                            coin.current_price.toFixed(
                                                                2
                                                            )
                                                        )}
                                                        <AiFillDelete
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                            fontSize="16"
                                                            onClick={() =>
                                                                removeFromWatchList(
                                                                    coin
                                                                )
                                                            }
                                                        ></AiFillDelete>
                                                    </span>
                                                </Coin>
                                            );
                                    })}
                                </Watchlist>
                            </Profile>
                            <LogoutButton variant="contained" onClick={logOut}>
                                Log Out
                            </LogoutButton>
                        </SidebarContainer>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
