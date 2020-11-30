import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { Container, TextField, Button, Link, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Auth from "../../../../../components/Auth";
import { db } from "../../../../../utils/Firebase";
import LoadingOverlay from "../../../../../components/LoadingOverlay";

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
};

const Create = () => {
    const [workload, setWorkload] = useState(null);

    const { register, errors, handleSubmit, formState } = useForm<TInput>();

    const router = useRouter();
    const { projectId, workloadId } = router.query;

    const classes = useStyles();

    useEffect(() => {
        if (!projectId || !workloadId) return;

        db.collection('projects')
            .doc(projectId.toString())
            .collection('workloads')
            .doc(workloadId.toString())
            .get()
            .then(doc => {
                console.log(doc.data());
                setWorkload(doc.data());
            })
        ;
    }, []);

    const handleClick = handleSubmit(async ({ title, comment }) => {
        if (!projectId || !workloadId) return;

        const data = {
            photoId: workloadId,
            title,
            comment
        }
        await db
            .collection('projects')
            .doc(projectId.toString())
            .collection('workloads')
            .doc(workloadId.toString())
            .set(data)
        ;

        await router.push(
            '/projects/[projectId]/workloads/[workloadId]',
            `/projects/${projectId}/workloads/${workloadId}`
        );
    });

    if (workload === null) {
        return <LoadingOverlay />;
    }

    return (
        <Auth>
            <Container component="main" maxWidth="xs">
                <div>
                    <NextLink
                        href="/projects/[projectId]/workloads/[workloadId]"
                        as={`/projects/${projectId}/workloads/${workloadId}`}
                    >
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
                        defaultValue={workload?.title}
                    />
                    <TextField
                        name="comment"
                        type="text"
                        label="コメント"
                        inputRef={register({
                            required: { value: true, message: "空であってはいけません" },
                            maxLength: { value: 40, message: "40文字以内で入力してください" }
                        })}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={8}
                        error={!!errors.comment}
                        helperText={errors.comment?.message}
                        defaultValue={workload?.comment}
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

export default Create;
