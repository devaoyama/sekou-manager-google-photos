import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import Auth from "../../components/Auth";
import { postRequest } from "../../utils/GooglePhotosApi";
import { AuthContext } from "../../contexts/Auth";
import { db } from "../../utils/Firebase";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(13),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Create = () => {
    const { accessToken } = useContext(AuthContext);

    const [title, setTitle] = useState('');

    const router = useRouter();

    const classes = useStyles();

    const handleClick = async () => {
        if (!accessToken) return;

        const body = {
            album: {
                title
            }
        };
        const res = await postRequest('albums', accessToken, JSON.stringify(body));
        await db.collection('projects').doc(res.id).set({ albumId: res.id, title });

        await router.push('/');
    };

    return (
        <Auth>
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <TextField
                        type="text"
                        label="プロジェクト名"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        type="button"
                        onClick={handleClick}
                        className={classes.submit}
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        作成
                    </Button>
                </div>
            </Container>
        </Auth>
    );
};

export default Create;
