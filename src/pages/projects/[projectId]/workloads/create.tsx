import React, { useContext } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import {Container, TextField, Button, Link, CircularProgress} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Auth from "../../../../components/Auth";
import { AuthContext } from "../../../../contexts/Auth";
import { postRequest, uploadFile } from "../../../../utils/GooglePhotosApi";
import { db } from "../../../../utils/Firebase";
import checkImageAspect from "../../../../utils/checkImageAspect";
import resizeImage from "../../../../utils/resizeImage";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

type TInput = {
    title: string
    comment: string
    images: FileList
};

const Create = () => {
    const { accessToken } = useContext(AuthContext);

    const { register, errors, handleSubmit, formState, setError } = useForm<TInput>();

    const router = useRouter();
    const { projectId } = router.query;

    const classes = useStyles();

    const handleClick = handleSubmit(async ({ title, comment, images }) => {
        if (!accessToken) return;

        if (images[0].type !== 'image/jpeg') {
            setError('images', {
                type: 'manual',
                message: 'JPEGファイル以外はアップロードできません'
            });
            return;
        }

        const result = await checkImageAspect(images[0]);
        if (result.width * 3 / 4 !== result.height) {
            setError('images', {
                type: 'manual',
                message: '画像のサイズが正しくありません。縦横比が4:3になるように撮影してください'
            });
            return;
        }
        const image = await resizeImage(images[0]);

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
    });

    return (
        <Auth>
            <Container component="main" maxWidth="xs">
                <div>
                    <NextLink href="/projects/[projectId]" as={`/projects/${projectId}`}>
                        <Link href="">
                            戻る
                        </Link>
                    </NextLink>
                </div>
                <div className={classes.paper}>
                    <TextField
                        name="title"
                        type="text"
                        label="施工名"
                        inputRef={register({
                            required: { value: true, message: "空であってはいけません" },
                            maxLength: { value: 40, message: "40文字以内で入力してください" }
                        })}
                        fullWidth
                        margin="normal"
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <TextField
                        name="comment"
                        type="text"
                        label="コメント"
                        inputRef={register({
                            required: { value: true, message: "空であってはいけません" },
                            maxLength: { value: 1000, message: "1000文字以内で入力してください" }
                        })}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={8}
                        error={!!errors.comment}
                        helperText={errors.comment?.message}
                    />
                    <TextField
                        name="images"
                        type="file"
                        margin="normal"
                        inputRef={register({
                            required: { value: true, message: "ファイルを選択してください" },
                        })}
                        fullWidth
                        error={!!errors.images}
                        helperText={errors.images?.message}
                    />
                    <Button
                        type="button"
                        onClick={handleClick}
                        className={classes.submit}
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={formState.isSubmitting}
                    >
                        {formState.isSubmitting ? (
                            <CircularProgress color="inherit" size="1.7em" />
                        ): '作成'}
                    </Button>
                </div>
            </Container>
        </Auth>
    );
};

export default Create;
