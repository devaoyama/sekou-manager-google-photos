import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { Button, CircularProgress, Container, Link, makeStyles, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { db } from "../../../utils/Firebase";
import Auth from "../../../components/Auth";
import LoadingOverlay from "../../../components/LoadingOverlay";

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
    place: string
    builder: string
    start: string
    end: string
}

const Edit = () => {
    const [project, setProject] = useState(null);

    const { register, errors, handleSubmit, formState } = useForm<TInput>();

    const router = useRouter();
    const { projectId } = router.query;

    const classes = useStyles();

    useEffect(() => {
        if (!projectId) return;

        db.collection('projects').doc(projectId.toString()).get()
            .then(doc => {
                setProject(doc.data());
            })
        ;
    }, []);

    const handleClick = handleSubmit(async ({ title, place, builder, start, end }) => {

        const data = { title, place, builder, start, end };
        await db.collection('projects').doc(projectId.toString()).update(data);

        await router.push(`/projects/${projectId}`);
    });

    if (project === null) {
        return <LoadingOverlay />
    }

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
                        defaultValue={project.title}
                    />
                    <TextField
                        type="text"
                        name="place"
                        label="工事場所"
                        inputRef={register({
                            required: { value: true, message: "空であってはいけません" },
                            maxLength: { value: 40, message: "40文字以内で入力してください" }
                        })}
                        required
                        fullWidth
                        margin="normal"
                        error={!!errors.place}
                        helperText={errors.place?.message}
                        defaultValue={project.place}
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
                        error={!!errors.builder}
                        helperText={errors.builder?.message}
                        defaultValue={project.builder}
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
                        defaultValue={project.start}
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
                        defaultValue={project.end}
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
                        ): '編集'}
                    </Button>
                </div>
            </Container>
        </Auth>
    );
};

export default Edit;
