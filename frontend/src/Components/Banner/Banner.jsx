import React from "react";
import { styled } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

// Define styled component
const DivBanner = styled("div")(({ theme }) => ({
    backgroundImage: "url(./banner1.jpg)",
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 0,
    justifyContent: "space-around",
}));

const BannerContent = styled(Container)(({ theme }) => ({
    height: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}));

const Title = styled(Typography)(({ theme }) => ({
    fontFamily: "Montserrat",
    fontWeight: "bold",
    marginBottom: 15,
}));

const Slogan = styled(Typography)(({ theme }) => ({
    color: "darkgrey",
    textTransform: "capitalize",
    fontFamily: "Montserrat",
}));

const Tagline = styled(Typography)(({ theme }) => ({
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
}));

const Banner = () => {
    return (
        <DivBanner>
            <BannerContent>
                <Tagline>
                    <Title variant="h2">Crypto Tracker</Title>
                    <Slogan variant="subtitle2">
                        Get all the Info regarding your favorite Crypto Currency
                    </Slogan>
                </Tagline>
                <Carousel></Carousel>
            </BannerContent>
        </DivBanner>
    );
};

export default Banner;
