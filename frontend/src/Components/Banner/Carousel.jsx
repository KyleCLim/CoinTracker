import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { TrendingCoins } from "../../Config/api";
import { CryptoState } from "../../CryptoContext";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";

const CarouselContainer = styled("div")(({ theme }) => ({
    height: "50%",
    display: "flex",
    alignItems: "center",
}));

const CarouselItem = styled("Link")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
}));

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const { currency, symbol } = CryptoState();
    const [trending, setTrending] = useState([]);

    const fetchTrendingCoins = async () => {
        try {
            const { data } = await axios.get(TrendingCoins(currency));

            setTrending(data);
        } catch (error) {
            console.log("Error found:", error);
        }
    };

    // console.log(trending);

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

    const item = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;
        return (
            <CarouselItem to={`/coins/${coin.id}`}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}
                />
                <span>
                    {coin?.symbol}&nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                        }}
                    >
                        {profit && "+"}{" "}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </CarouselItem>
        );
    });

    //responsive design of carousel depending on media screen size
    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    return (
        <CarouselContainer>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={item}
            />
        </CarouselContainer>
    );
};

export default Carousel;
