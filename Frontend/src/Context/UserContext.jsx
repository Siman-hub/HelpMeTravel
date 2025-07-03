import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../Components/Firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user }}>
            {!loading && children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
