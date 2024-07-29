import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "./Config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState("USD");
    const [symbol, setSymbol] = useState("$");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "",
    });

    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        if (user) {
            const coinRef = doc(db, "watchlist", user?.uid);
            var unsubscribe = onSnapshot(coinRef, (coin) => {
                if (coin.exists()) {
                    console.log(coin.data().coins);
                    setWatchlist(coin.data().coins);
                } else {
                    console.log("No Items in Watchlist");
                }
            });

            return () => {
                unsubscribe();
            };
        }
    }, [user]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) setUser(user);
            else setUser(null);
            // console.log(user);
        });
    }, []);

    const fetchCoins = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(CoinList(currency));
            setCoins(data);
            setLoading(false);
        } catch (error) {
            console.log("Error found:", error);
        }
    };

    useEffect(() => {
        if (currency === "USD") setSymbol("$");
        else if (currency === "PHP") setSymbol("₱");
    }, [currency]);

    return (
        <Crypto.Provider
            value={{
                currency,
                setCurrency,
                symbol,
                coins,
                loading,
                fetchCoins,
                alert,
                setAlert,
                user,
                watchlist,
            }}
        >
            {children}
        </Crypto.Provider>
    );
};

export const CryptoState = () => {
    return useContext(Crypto);
};

export default CryptoContext;
