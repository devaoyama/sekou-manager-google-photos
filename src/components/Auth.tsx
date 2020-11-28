import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/Auth";

const Auth = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    const router = useRouter();

    if (currentUser === undefined) {
        return <div>Loading</div>;
    }

    if (currentUser) {
        return children;
    }

    router.push('/login');

    return null;
};

export default Auth;
