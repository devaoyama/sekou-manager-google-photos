import React from "react";
import { Button } from "@material-ui/core";
import { auth } from "../utils/Firebase";

const Logout = () => {
    const handleClick = async () => {
        await auth.signOut();
    };

    return (
        <div>
            <Button color="inherit" onClick={handleClick}>ログアウト</Button>
        </div>
    );
};

export default Logout;
