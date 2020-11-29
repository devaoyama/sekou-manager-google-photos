import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Container, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Auth from "../../../../components/Auth";
import { AuthContext } from "../../../../contexts/Auth";
import { postRequest, uploadFile } from "../../../../utils/GooglePhotosApi";
import { db } from "../../../../utils/Firebase";

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

    const [comment, setComment] = useState('');

    const [image, setImage] = useState(null);

    const router = useRouter();
    const { projectId } = router.query;

    const classes = useStyles();

    const handleClick = async () => {
        if (!accessToken) return;

        let response = await uploadFile(accessToken, image);
        const body = {
            albumId: projectId,
            newMediaItems: [{
                simpleMediaItem: {
                    uploadToken: response
                }
            }]
        };
        const { newMediaItemResults } = await postRequest('mediaItems:batchCreate', accessToken, JSON.stringify(body));
        const photoId = newMediaItemResults[0].mediaItem.id;
        const data = {
            photoId,
            title,
            comment
        }
        await db
            .collection('projects')
            .doc(projectId.toString())
            .collection('workloads')
            .doc(photoId)
            .set(data)
        ;

        await router.push('/projects/[projectId]', `/projects/${projectId}`);
    };

    return (
        <Auth>
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <TextField
                        type="text"
                        label="施工名"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        type="text"
                        label="コメント"
                        value={comment}
                        onChange={event => setComment(event.target.value)}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                    />
                    <input
                        type="file"
                        onChange={event => setImage(event.target.files[0])}
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
