import React, { createContext, useEffect, useState } from 'react';
import firebase, { db } from '../utils/Firebase';
import {Backdrop, CircularProgress} from "@material-ui/core";

type AuthContextProps = {
    currentUser: firebase.User | null | undefined
    accessToken: string | null
};

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined, accessToken: null });

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null | undefined>(
        undefined
    );

    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    useEffect(() => {
        if (!currentUser) return;
        db.collection('users').doc(currentUser.uid).get()
            .then(doc => {
                setAccessToken(doc.data().access_token);
            })
        ;
    }, [currentUser]);

    if (currentUser === undefined) {
        return (
            <React.Fragment>
                <Backdrop open={true} onClick={() => {}}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                {children}
            </React.Fragment>
        );
    }

    return (
        <AuthContext.Provider value={{ currentUser: currentUser, accessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
