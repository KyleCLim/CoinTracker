import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../Config/api";
import axios from "axios";
import { styled } from "@mui/material/styles";
import CoinInfo from "../Components/CoinInfo";
import { Button, Container, LinearProgress, Typography } from "@mui/material";
import ReactHtmlParser from "html-react-parser";
import { numberWithCommas } from "../Components/Banner/Carousel";
import { doc } from "firebase/firestore";
import { db } from "../firebase";
import { setDoc } from "firebase/firestore";

const Coin = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const { currency, symbol, user, setAlert, watchlist } = CryptoState();

    const fetchCoin = async () => {
        try {
            const { data } = await axios.get(SingleCoin(id));

            setCoin(data);
        } catch (error) {
            console.log("Found error: ", error);
        }
    };

    // console.log(coin);

    const CoinsContainer = styled(Container)(({ theme }) => ({
        display: "flex",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
        },
    }));

    const Sidebar = styled("div")(({ theme }) => ({
        width: "30%",
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey",
    }));

    const Heading = styled(Typography)(({ theme }) => ({
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "Montserrat",
    }));

    const Description = styled(Typography)(({ theme }) => ({
        width: "100%",
        fontFamily: "Montserrat",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify",
    }));

    const MarketData = styled("div")(({ theme }) => ({
        alignSelf: "start",
        padding: 25,
        paddingTop: 10,
        width: "100%",
        //Responsiveness
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
        },
        [theme.breakpoints.down("md")]: {
            display: "flex",
            justifyContent: "column",
            alignItems: "center",
        },
        [theme.breakpoints.down("xs")]: {
            alignItems: "start",
        },
    }));

    const AddToWatchlistButton = styled(Button)(({ theme }) => ({
        width: "100%",
        height: 40,
        color: "white",
        border: "none",
        backgroundColor: "#EEBC1D",
        "&:hover": { backgroundColor: "grey", border: "none", color: "black" },
    }));

    const inWatchlist = watchlist.includes(coin?.id);

    const addToWatchlist = async () => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(coinRef, {
                coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
            });
            setAlert({
                open: true,
                message: `${coin.name} Added to the Watchlist!`,
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

    const removeFromWatchList = async () => {
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

    useEffect(() => {
        fetchCoin();
    }, []);

    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

    return (
        <CoinsContainer>
            <Sidebar>
                <img
                    src={coin?.image.large}
                    alt={coin?.name}
                    height="200"
                    style={{ marginBottom: 20 }}
                />
                <Heading variant="h3">{coin?.name}</Heading>
                <Description>
                    {ReactHtmlParser(coin?.description.en.split(". ")[0])}
                </Description>
                <MarketData>
                    <span style={{ display: "flex" }}>
                        <Heading variant="p">Rank: </Heading>
                        &nbsp; &nbsp;
                        <Typography
                            variant="p"
                            style={{ fontFamily: "Montserrat" }}
                        >
                            {coin?.market_cap_rank}
                        </Typography>
                    </span>
                    <span style={{ display: "flex" }}>
                        <Heading variant="p">Current Price: </Heading>
                        &nbsp; &nbsp;
                        <Typography
                            variant="p"
                            style={{ fontFamily: "Montserrat" }}
                        >
                            {symbol}{" "}
                            {numberWithCommas(
                                coin?.market_data.current_price[
                                    currency.toLowerCase()
                                ]
                            )}
                        </Typography>
                    </span>
                    <span style={{ display: "flex" }}>
                        <Heading variant="p">Market Cap: </Heading>
                        &nbsp; &nbsp;
                        <Typography
                            variant="p"
                            style={{ fontFamily: "Montserrat" }}
                        >
                            {symbol}{" "}
                            {numberWithCommas(
                                coin?.market_data.market_cap[
                                    currency.toLowerCase()
                                ]
                                    .toString()
                                    .slice(0, -1)
                            )}
                        </Typography>
                    </span>
                    {user && (
                        <AddToWatchlistButton
                            variant="outlined"
                            style={{
                                width: "100%",
                                height: 40,
                                backgroundColor: inWatchlist
                                    ? "#cf4141"
                                    : "EEBC1D",
                            }}
                            onClick={
                                inWatchlist
                                    ? removeFromWatchList
                                    : addToWatchlist
                            }
                        >
                            {inWatchlist
                                ? "Remove from Watchlist"
                                : "Add to Watchlist"}
                        </AddToWatchlistButton>
                    )}
                </MarketData>
            </Sidebar>
            {/* chart */}
            <CoinInfo coin={coin} />
        </CoinsContainer>
    );
};

export default Coin;
