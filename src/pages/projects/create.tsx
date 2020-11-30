import React, { useContext } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { Button, CircularProgress, Container, Link, makeStyles, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Auth from "../../components/Auth";
import { postRequest } from "../../utils/GooglePhotosApi";
import { AuthContext } from "../../contexts/Auth";
import { db } from "../../utils/Firebase";

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
    type: string
    builder: string
    start: string
    end: string
}

const Create = () => {
    const { accessToken, currentUser } = useContext(AuthContext);

    const { register, errors, handleSubmit, formState } = useForm<TInput>();

    const router = useRouter();

    const classes = useStyles();

    const handleClick = handleSubmit(async (input) => {
        if (!accessToken) return;
        const { title, type, builder, start, end } = input;

        const body = {
            album: {
                title
            }
        };
        const res = await postRequest('albums', accessToken, JSON.stringify(body));
        const data = { title, type, builder, start, end, albumId: res.id, user: currentUser.uid };
        await db.collection('projects').doc(res.id).set(data);

        await router.push('/');
    });

    return (
        <Auth>
            <Container component="main" maxWidth="xs">
                <div>
                    <NextLink href="/">
                        <Link href="">
                            戻る
                        </Link>
                    </NextLink>
                </div>
                <div className={classes.paper}>
                    <TextField
                        type="text"
                        name="title"
                        label="工事名"
                        inputRef={register({
                            required: { value: true, message: "空であってはいけません" },
                            maxLength: { value: 40, message: "40文字以内で入力してください" }
                        })}
                        required
                        fullWidth
                        margin="normal"
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <TextField
                        type="text"
                        name="type"
                        label="工種"
                        inputRef={register({
                            required: { value: true, message: "空であってはいけません" },
                            maxLength: { value: 40, message: "40文字以内で入力してください" }
                        })}
                        required
                        fullWidth
                        margin="normal"
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <TextField
                        type="text"
                        name="builder"
                        label="工事施工者"
                        inputRef={register({
                            required: { value: true, message: "空であってはいけません" },
                            maxLength: { value: 40, message: "40文字以内で入力してください" }
                        })}
                        required
                        fullWidth
                        margin="normal"
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <TextField
                        type="date"
                        name="start"
                        label="着工"
                        inputRef={register({required: { value: true, message: "空であってはいけません" } })}
                        fullWidth
                        required
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={!!errors.start}
                        helperText={errors.start?.message}
                    />
                    <TextField
                        type="date"
                        name="end"
                        label="竣工"
                        inputRef={register}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
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
