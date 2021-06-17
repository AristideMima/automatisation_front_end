import { Grid, makeStyles } from '@material-ui/core';
import { useField } from 'formik';
import  { Fragment, useCallback, useEffect, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgress';
import { UploadError } from './UploadError';
import React from 'react';

let currentId = 0;

function getNewId() {
    // we could use a fancier solution instead of a sequential ID :)
    return ++currentId;
}

export interface UploadableFile {
    // id was added after the video being released to fix a bug
    // Video with the bug -> https://youtube-2021-feb-multiple-file-upload-formik-bmvantunes.vercel.app/bug-report-SMC-Alpha-thank-you.mov
    // Thank you for the bug report SMC Alpha - https://www.youtube.com/channel/UC9C4AlREWdLoKbiLNiZ7XEA
    id: number;
    file: File;
    errors: FileError[];
    url?: string;
}

const useStyles = makeStyles((theme) => ({
    dropzone: {
        border: `2px dashed #616161`,
        borderRadius: theme.shape.borderRadius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.background.default,
        height: theme.spacing(10),
        outline: 'none',
    },
}));

export function MultipleFileUploadField({ name }: { name: string }) {
    const [_, __, helpers] = useField(name);
    const classes = useStyles();

    const [files, setFiles] = useState<UploadableFile[]>([]);
    const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
        const mappedAcc = accFiles.map((file) => ({ file, errors: [], id: getNewId() }));
        const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }));
        setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
    }, []);

    useEffect(() => {
        helpers.setValue(files);
        // helpers.setTouched(true);
    }, [files]);

    function onUpload(file: File, url: string) {
        setFiles((curr) =>
            curr.map((fw) => {
                if (fw.file === file) {
                    return { ...fw, url };
                }
                return fw;
            })
        );
    }

    function onDelete(file: File) {
        setFiles((curr) => curr.filter((fw) => fw.file !== file));
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: ['text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        maxSize: 300 * 1024, // 300KB
    });

    return (
        <Fragment>
            <Grid item>
                <div  {...getRootProps({ className: classes.dropzone })}>
                    <input {...getInputProps()} />

                    <p>CLiquez ou déposez votre fichier</p>
                </div>
            </Grid>

            {files.map((fileWrapper) => (
                <Grid item key={fileWrapper.id}>
                    {fileWrapper.errors.length ? (
                        <UploadError
                            file={fileWrapper.file}
                            errors={fileWrapper.errors}
                            onDelete={onDelete}
                        />
                    ) : (
                        <SingleFileUploadWithProgress
                            onDelete={onDelete}
                            onUpload={onUpload}
                            file={fileWrapper.file}
                        />
                    )}
                </Grid>
            ))}
        </Fragment>
    );
}