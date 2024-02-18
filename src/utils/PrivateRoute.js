import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    // const token = localStorage.getItem("token");
    return (tokens?.access) ? children : <Navigate to={"/user/login"} />;
};


export default PrivateRoute;