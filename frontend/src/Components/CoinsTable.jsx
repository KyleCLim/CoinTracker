import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
    Container,
    LinearProgress,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { numberWithCommas } from "./Banner/Carousel";

const CoinsTable = () => {
    const navigate = useNavigate();
    const { currency, symbol, coins, loading, fetchCoins } = CryptoState();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    const Row = styled(TableRow)(({ theme }) => ({
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": { backgroundColor: "#131111" },
        fontFamily: "Montserrat",
    }));

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        );
    };

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography
                    variant="h4"
                    style={{ margin: 18, fontFamily: "Montserrat" }}
                >
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField
                    label="Search For a Crypto Currency.."
                    variant="outlined"
                    style={{ marginBottom: 20, width: "100%" }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer>
                    {loading ? (
                        <LinearProgress style={{ background: "gold" }} />
                    ) : (
                        <Table>
                            <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                <TableRow>
                                    {[
                                        "Coin",
                                        "Price",
                                        "24h Change",
                                        "Market Cap",
                                    ].map((head) => (
                                        <TableCell
                                            style={{
                                                color: "black",
                                                fontWeight: "700",
                                                fontFamily: "Montserrat",
                                            }}
                                            key={head}
                                            align={
                                                head === "Coin" ? "" : "right"
                                            }
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch()
                                    .slice(
                                        (page - 1) * 10,
                                        (page - 1) * 10 + 10
                                    )
                                    .map((row) => {
                                        const profit =
                                            row.price_change_percentage_24h > 0;

                                        return (
                                            <Row
                                                onClick={() =>
                                                    navigate(`/coins/${row.id}`)
                                                }
                                                key={row.name}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    style={{
                                                        display: "flex",
                                                        gap: 15,
                                                    }}
                                                >
                                                    <img
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height="50"
                                                        style={{
                                                            marginBottom: 10,
                                                        }}
                                                    />
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                textTransform:
                                                                    "uppercase",
                                                                fontSize: 22,
                                                            }}
                                                        >
                                                            {row.symbol}
                                                        </span>
                                                        <span
                                                            style={{
                                                                color: "darkgrey",
                                                            }}
                                                        >
                                                            {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(
                                                        row.current_price.toFixed(
                                                            2
                                                        )
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    style={{
                                                        color:
                                                            profit > 0
                                                                ? "rgb(14, 203, 129)"
                                                                : "red",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(
                                                        2
                                                    )}
                                                    %
                                                </TableCell>
                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(
                                                        row.market_cap
                                                            .toString()
                                                            .slice(0, -1)
                                                    )}
                                                </TableCell>
                                            </Row>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
                <Pagination
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    // count={(handleSearch()?.length / 10).toFixed(0)}
                    count={Math.ceil(handleSearch().length / 10)}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                />
            </Container>
        </ThemeProvider>
    );
};

export default CoinsTable;
