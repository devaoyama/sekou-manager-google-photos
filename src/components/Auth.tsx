import React, {useContext, useEffect} from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/Auth";

const Auth = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    const router = useRouter();

    useEffect(() => {
        if (currentUser === null) {
            router.push('/login');
        }
    }, [currentUser])

    if (currentUser) {
        return children;
    }

    return null;
};

export default Auth;
