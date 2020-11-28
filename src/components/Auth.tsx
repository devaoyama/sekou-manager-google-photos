import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/Auth";

const Auth = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    const router = useRouter();

    if (currentUser === undefined) {
        return <div>Loading</div>
    }

    if (currentUser === null) {
        router.push('/login');
    }

    return children;
};

export default Auth;
