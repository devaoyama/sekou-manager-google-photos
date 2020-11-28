import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";
import { AuthContext } from "../contexts/Auth";
import firebase, { auth, db } from "../utils/Firebase";

const Login = () => {
    const { currentUser } = useContext(AuthContext);

    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            auth.getRedirectResult().then(async ({ credential }) => {
                if (credential) {
                    await db
                        .collection('users')
                        .doc(currentUser.uid)
                        // @ts-ignore
                        .set({ access_token: credential.accessToken })
                }
                await router.push('/');
            });
        }
    }, [currentUser]);

    const handleClick = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/photoslibrary');
        await auth.signInWithRedirect(provider);
    };

    return (
        <div>
            <div>ログイン</div>
            <Button onClick={handleClick}>ログイン</Button>
        </div>
    );
};

export default Login;
