import React, { createContext, useState, useEffect } from "react";
import api from "./api"; // Import API helper

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Automatically fetch token from API (e.g., from cookies or backend session)
        api.get("/auth/token")
            .then(response => setToken(response.data.token))
            .catch(() => setToken(null));
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
