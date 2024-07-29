import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Coin from "./Pages/Coin";
import Notice from "./Components/Notice";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
    },
    {
        path: "/coins/:id",
        element: <Coinpage />,
    },
]);

function Homepage() {
    return (
        <div>
            <div className="App">
                <Header />
                <Home />
            </div>
            <Notice />
        </div>
    );
}

function Coinpage() {
    return (
        <div>
            <div className="App">
                <Header />
                <Coin />
            </div>
        </div>
    );
}

function App() {
    return <RouterProvider router={router} />;
}

export default App;
